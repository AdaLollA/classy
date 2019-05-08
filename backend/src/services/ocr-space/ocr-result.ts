import { ApiModelProperty } from '@nestjs/swagger';

export class OcrResult {
  @ApiModelProperty()
  readonly campus: string;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly birthday: string;

  @ApiModelProperty()
  readonly nation: string;

  @ApiModelProperty()
  readonly studentId: string;
}
