<script setup lang='ts'>
import { useToast } from 'primevue/usetoast';
import { usePrimeVue } from 'primevue/config';
import AppTopBar from '../components/app/AppTopbar.vue';
import AppMenu from '../components/app/AppMenu.vue';
import AppFooter from '../components/app/AppFooter.vue';
import { getNavigationMenu } from '~/logic/navigation';

const layoutMode = ref('static');
const staticMenuInactive = ref(false);
const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const menuClick = ref(false);
const menuActive = ref(false);

const toast = useToast();
const primeVue = usePrimeVue();
const route = useRoute();

const initializing = ref(true);
const loading = ref(false);
const layout = ref();

const windowWidth = ref(window.innerWidth);
const layoutWidth = ref(windowWidth.value);
function handleResize() {
    windowWidth.value = window.innerWidth;
    layoutWidth.value = layout.value.clientWidth;
}

onMounted(async () => {
    initializing.value = true;
    window.addEventListener('resize', handleResize);
    handleResize();
    initializing.value = false;
});

onUnmounted(async () => {
    initializing.value = true;
    window.removeEventListener('resize', handleResize);
});

watch(() => route,
    (async) => {
        menuActive.value = false;
        toast.removeAllGroups();
    },
);

function onWrapperClick() {
    if (!menuClick.value) {
        overlayMenuActive.value = false;
        mobileMenuActive.value = false;
    }
    menuClick.value = false;
}

function onMenuToggle() {
    menuClick.value = true;

    if (isDesktop()) {
        if (layoutMode.value === 'overlay') {
            if (mobileMenuActive.value === true) { overlayMenuActive.value = true; }

            overlayMenuActive.value = !overlayMenuActive.value;
            mobileMenuActive.value = false;
        }
        else if (layoutMode.value === 'static') {
            staticMenuInactive.value = !staticMenuInactive.value;
        }
    }
    else {
        mobileMenuActive.value = !mobileMenuActive.value;
    }
}

function onSidebarClick() {
    menuClick.value = true;
}

function onmenuItemClick(event: any) {
    if (event.item && !event.item.items) {
        overlayMenuActive.value = false;
        mobileMenuActive.value = false;
    }
}

function addClass(element: HTMLElement, className: string) {
    if (element.classList) { element.classList.add(className); }
    else { element.className += ` ${className}`; }
}

function removeClass(element: HTMLElement, className: string) {
    if (element.classList) { element.classList.remove(className); }
    else { element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' '); }
}

function isDesktop() {
    return window.innerWidth >= 992;
}

const containerClass = computed(() => ['layout-wrapper', {
    'layout-overlay': layoutMode.value === 'overlay',
    'layout-static': layoutMode.value === 'static',
    'layout-static-sidebar-inactive': staticMenuInactive.value && layoutMode.value === 'static',
    'layout-overlay-sidebar-active': overlayMenuActive.value && layoutMode.value === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive.value,
    'p-input-filled': primeVue.config.inputStyle === 'filled',
    'p-ripple-disabled': primeVue.config.ripple === false,
}]);

onBeforeUpdate(() => {
    if (mobileMenuActive.value) { addClass(document.body, 'body-overflow-hidden'); }
    else { removeClass(document.body, 'body-overflow-hidden'); }
},
);
</script>

<template>
    <div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="getNavigationMenu()" @menu-item-click="onmenuItemClick" />
        </div>

        <ProgressBar v-if="initializing" mode="indeterminate" class="loader-page" />
        <div class="layout-main-container">
            <div ref="layout" class="layout-main">
                <router-view v-if="!initializing" :loading="loading" :window-width="windowWidth" />
            </div>
            <AppFooter />
        </div>
    </div>
</template>
