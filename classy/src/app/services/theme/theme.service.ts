import {Inject, Injectable} from '@angular/core';
import {DomController} from '@ionic/angular';
import {DOCUMENT} from '@angular/common';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

interface Theme {
    name: string;
    styles: ThemeStyle[];
}

interface ThemeStyle {
    themeVariable: string;
    value: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private themes: Theme[] = [];
    private isDark: boolean;

    constructor(private domCtrl: DomController, @Inject(DOCUMENT) private document) {
        this.themes = [
            {
                name: 'default',
                styles: [
                    {themeVariable: '--ion-background-color', value: '#f4f5f8'},
                    {themeVariable: '--ion-background-color-rgb', value: '244, 244, 244'},
                    {themeVariable: '--ion-text-color', value: '#222428'},
                    {themeVariable: '--ion-text-color-rgb', value: '34, 34, 34'},
                    {themeVariable: '--ion-overlay-background-color', value: '#FFFFFF'},
                    {themeVariable: '--ion-toolbar-background', value: '#f4f5f8'},
                    {themeVariable: '--ion-toolbar-color', value: '#222428'},
                    {themeVariable: '--ion-color-step-600', value: '#415878'},

                    {themeVariable: '--ion-color-primary', value: '#3880ff'},
                    {themeVariable: '--ion-color-primary-rgb', value: '56, 128, 255'},
                    {themeVariable: '--ion-color-primary-contrast', value: '#ffffff'},
                    {themeVariable: '--ion-color-primary-contrast-rgb', value: '255,255,255'},
                    {themeVariable: '--ion-color-primary-shade', value: '#3171e0'},
                    {themeVariable: '--ion-color-primary-tint', value: '#4c8dff'},
                    {themeVariable: '--ion-color-secondary', value: '#0cd1e8'},
                    {themeVariable: '--ion-color-secondary-rgb', value: '12, 209, 232'},
                    {themeVariable: '--ion-color-secondary-contrast', value: '#ffffff'},
                    {themeVariable: '--ion-color-secondary-contrast-rgb', value: '255,255,255'},
                    {themeVariable: '--ion-color-secondary-shade', value: '#0bb8cc'},
                    {themeVariable: '--ion-color-secondary-tint', value: '#24d6ea'}
                ]
            },
            {
                name: 'dark',
                styles: [
                    {themeVariable: '--ion-background-color', value: '#0f1e33'},
                    {themeVariable: '--ion-background-color-rgb', value: '15,30,51'},
                    {themeVariable: '--ion-text-color', value: '#FFFFFF'},
                    {themeVariable: '--ion-text-color-rgb', value: '255,255,255'},
                    {themeVariable: '--ion-backdrop-color', value: '#FFFFFF'},
                    {themeVariable: '--ion-overlay-background-color', value: '#FFFFFF'},
                    {themeVariable: '--ion-toolbar-background', value: '#0f1e33'},
                    {themeVariable: '--ion-toolbar-color', value: '#475E7F'},
                    {themeVariable: '--ion-color-step-600', value: '#415878'},

                    {themeVariable: '--ion-color-primary', value: 'linear-gradient(0, #72EDF2 10%, #5151E5 100%)'},
                    {themeVariable: '--ion-color-primary-rgb', value: '34,34,34'},
                    {themeVariable: '--ion-color-primary-contrast', value: '#ffffff'},
                    {themeVariable: '--ion-color-primary-contrast-rgb', value: '255,255,255'},
                    {themeVariable: '--ion-color-primary-shade', value: '#1e2023'},
                    {themeVariable: '--ion-color-primary-tint', value: '#383a3e'},
                    {themeVariable: '--ion-color-secondary', value: 'linear-gradient(90deg, #72EDF2 10%, #5151E5 100%)'},
                    {themeVariable: '--ion-color-secondary-rgb', value: '34,34,34'},
                    {themeVariable: '--ion-color-secondary-contrast', value: '#ffffff'},
                    {themeVariable: '--ion-color-secondary-contrast-rgb', value: '255,255,255'},
                    {themeVariable: '--ion-color-secondary-shade', value: '#1e2023'},
                    {themeVariable: '--ion-color-secondary-tint', value: '#383a3e'}
                ]
            }
        ];

        this.init();
    }

    private async init() {
        Storage.get({key: 'theme'}).then(name => {
            this.setTheme(name.value);
            this.isDark = name.value === 'dark';
        });
    }


    public cycleTheme(): void {
        if (this.isDark) {
            this.setTheme('default');
            this.isDark = false;
        } else {
            this.setTheme('dark');
            this.isDark = true;
        }
    }

    public async setTheme(name: string) {
        const theme = this.themes.find(themeStyle => themeStyle.name === name);

        this.domCtrl.write(() => {

            theme.styles.forEach(style => {
                document.documentElement.style.setProperty(style.themeVariable, style.value);
            });

        });

        await Storage.set({
            key: 'theme',
            value: name
        });
    }

    public async getStoredTheme() {
        return await Storage.get({key: 'theme'});
    }
}
