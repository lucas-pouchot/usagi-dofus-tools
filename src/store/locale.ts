import { defineStore } from 'pinia';
import type { RemovableRef } from '@vueuse/core';

export enum SupportedLocale {
    fr = 'fr',
    en = 'en',
}

export interface StoreLocaleInterface {
    locale: SupportedLocale
}

const defaultState: StoreLocaleInterface = {
    locale: SupportedLocale.fr,
};

export const useLocaleStore = defineStore('locale', {
    state: (): RemovableRef<StoreLocaleInterface> => {
        return useLocalStorage('locale', defaultState);
    },
    actions: {
        setLocale(newLocale: SupportedLocale) {
            this.locale = newLocale;
        },
    },
});

