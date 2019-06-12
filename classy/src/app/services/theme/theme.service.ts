import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {CssTextGenerator, Theme} from './css-text-generator';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


const themes: Theme[] = [
    {
        name: 'dark',
        styles: {
            primary: '#18386B',
            secondary: '#9EB7E8',
            tertiary: '#343F59',
            medium: '#FFFFFF',
            dark: '#FFFFFF',
            light: '#222C41'
        }
    }
];

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private isDark = false;


    constructor(@Inject(DOCUMENT) private document: Document) {
        this.init();
    }

    private async init() {
        Storage.get({key: 'theme'}).then(cssText => {
            this.setGlobalCSS(cssText.value);
        });
    }

    // Override all global variables with a new theme
    public async toggleDarkTheme() {
        const cssText = CssTextGenerator.getColors(themes.find(theme => theme.name === 'dark').styles);
        this.setGlobalCSS(cssText);
        await Storage.set({
            key: 'theme',
            value: cssText
        });
    }


    // Override all global variables with a new theme
    public async setTheme(style: string) {
        const cssText = CssTextGenerator.getColors(themes.find(theme => theme.name === style).styles);
        this.setGlobalCSS(cssText);
        await Storage.set({
            key: 'theme',
            value: cssText
        });
    }

    // Define a single CSS variable
    private setVariable(name: string, value: string) {
        this.document.documentElement.style.setProperty(name, value);
    }

    private setGlobalCSS(css: string) {
        this.document.documentElement.style.cssText = css;
    }

    public async getStoredTheme() {
        return await Storage.get({key: 'theme'});
    }
}

