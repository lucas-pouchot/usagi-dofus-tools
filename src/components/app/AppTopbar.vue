<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useThemeStore } from '~/store/theme';
import { SupportedLocale, useLocaleStore } from '~/store/locale';

const emit = defineEmits(['menuToggle', 'topbarMenuToggle']);
const { t, availableLocales, locale, messages } = useI18n();

const router = useRouter();

const themeStore = useThemeStore();
themeStore.initTheme();
const localeStore = useLocaleStore();
const themePanel = ref<any>(null);

const localePanel = ref<any>(null);

const toggleLocales = (newLocale: SupportedLocale) => {
    // change to some real logic
    const locales = availableLocales;
    const translations = availableLocales.find(l => l === newLocale);
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
    if (translations) {
        locale.value = translations;
        localeStore.setLocale(newLocale);
    }
};
toggleLocales(localeStore.locale);

function toggleTheme(event: any) {
    themePanel.value.toggle(event);
}

function toggleLocale(event: any) {
    localePanel.value.toggle(event);
}

function goToProfile(event: any) {
    router.push('/profile');
}

function onMenuToggle(event: any) {
    emit('menuToggle', event);
}

function onTopbarMenuToggle(event: any) {
    emit('topbarMenuToggle', event);
}
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <span>Usagi's Dofus tools</span>
        </router-link>
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
            <i class="pi pi-bars" />
        </button>

        <button
            v-styleclass="{
                selector: '@next',
                enterClass: 'hidden',
                enterActiveClass: 'scalein',
                toggleClass: 'hidden',
                leaveActiveClass: 'fadeout',
                hideOnOutsideClick: true,
            }"
            class="p-link layout-topbar-menu-button layout-topbar-button"
        >
            <i class="pi pi-ellipsis-v" />
        </button>

        <ul class="layout-topbar-menu hidden lg:flex origin-top">
            <li>
                <button class="p-link layout-topbar-button" @click="toggleTheme">
                    <i class="i-carbon-sun dark:i-carbon-moon" />
                    <span>{{ t('menu.theme.label') }}</span>
                </button>
            </li>
            <li>
                <button class="p-link layout-topbar-button" @click="toggleLocale">
                    <i class="i-mdi-flag" />
                    <span>{{ t('menu.locale') }}</span>
                </button>
            </li>
        </ul>
        <OverlayPanel ref="themePanel" append-to="body" style="width: 200px">
            <div class="field-radiobutton" @click="themeStore.setLight()">
                <RadioButton
                    id="set-theme-light" v-model="themeStore.themeName" name="layoutColorMode" value="light"
                    @change="themeStore.setLight()"
                />
                <label for="set-theme-light" class="pl-2">{{ t('menu.theme.light') }}</label>
            </div>
            <div class="field-radiobutton" @click="themeStore.setDark()">
                <RadioButton
                    id="set-theme-dark" v-model="themeStore.themeName" name="layoutColorMode" value="dark"
                    @change="themeStore.setDark()"
                />
                <label for="set-theme-dark" class="pl-2">{{ t('menu.theme.dark') }}</label>
            </div>
        </OverlayPanel>
        <OverlayPanel ref="localePanel" append-to="body" style="width: 200px">
            <div class="field-radiobutton" @click.stop.prevent="toggleLocales(SupportedLocale.fr)">
                <RadioButton id="set-locale-fr" v-model="localeStore.locale" name="layoutLocaleMode" :value="SupportedLocale.fr" />
                <label for="set-theme-light" class="pl-2">{{ t('locale.fr') }}</label>
            </div>
            <div class="field-radiobutton" @click.stop.prevent="toggleLocales(SupportedLocale.en)">
                <RadioButton id="set-locale-en" v-model="localeStore.locale" name="layoutLocaleMode" :value="SupportedLocale.en" />
                <label for="set-theme-dark" class="pl-2">{{ t('locale.en') }}</label>
            </div>
        </OverlayPanel>
    </div>
</template>

<style scoped>
.hidden {
  display: none !important;
}

@media (min-width: 1024px) {
  .lg\:flex {
    display: flex !important;
  }
}
</style>
