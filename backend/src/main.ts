import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import bodyParser = require('body-parser');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

async function bootstrapServer(): Promise<Server> {
  if ( !cachedServer ) {
    try {
      const expressApp = require('express')();
      const nestApp = await NestFactory.create(AppModule, expressApp);
      nestApp.use(bodyParser.json({ limit: '50mb' }));
      nestApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
      nestApp.enableCors();
      nestApp.use(eventContext());

      // Init Swagger
      // const options = new DocumentBuilder()
      //   .setTitle('Classy API')
      //   .setDescription('API for the classy application')
      //   .setVersion('1.0')
      //   .addTag('classy')
      //   .build();
      //
      // const document = SwaggerModule.createDocument(nestApp, options);
      // SwaggerModule.setup('api', nestApp, document);

      await nestApp.init();
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve(cachedServer);
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
