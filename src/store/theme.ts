import { defineStore } from 'pinia';
import type { RemovableRef } from '@vueuse/core';

export enum SupportedTheme {
    dark = 'dark',
    light = 'light',
}

export interface StoreThemeInterface {
    themeName: SupportedTheme
}

const defaultState: StoreThemeInterface = {
    themeName: (preferredDark || isDark) ? SupportedTheme.dark : SupportedTheme.light,
};

export function updateTheme(themeName: SupportedTheme) {
    toggleDark(themeName === SupportedTheme.dark);
    const newValue = `/theme/${themeName}.css`;
    const relElements = Array.prototype.slice.call(document.getElementsByTagName('link'));
    relElements.forEach((element: HTMLElement) => {
        if (element.getAttribute('href') && element.getAttribute('href')?.includes('theme/')) { element.setAttribute('href', newValue); }
    });
}

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useThemeStore = defineStore('theme', {
    // a function that returns a fresh state
    state: (): RemovableRef<StoreThemeInterface> => {
        return useLocalStorage('theme', defaultState);
    },
    // optional getters
    getters: {
        theme: (state) => {
            return state.themeName;
        },
        isDarkMode: state => state.themeName === 'dark',
    },
    // optional actions
    actions: {
        initTheme() {
            updateTheme(this.themeName);
        },
        setDark() {
            this.themeName = SupportedTheme.dark;
            updateTheme(this.themeName);
        },
        setLight() {
            this.themeName = SupportedTheme.light;
            updateTheme(this.themeName);
        },
    },
});
