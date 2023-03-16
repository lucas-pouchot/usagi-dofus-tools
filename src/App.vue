<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
    title: 'Usagi\'s dofus tools',
    meta: [
        { name: 'description', content: 'Usagi\'s dofus tools' },
        {
            name: 'theme-color',
            content: computed(() => isDark.value ? '#1f2d40' : '#ffffff'),
        },
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/svg+xml',
            href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
        },
    ],
});
</script>

<template>
    <ConfirmDialog style="z-index: 5"></ConfirmDialog>
    <Toast />
    <Toast group="error" />
    <div id="bar" />
    <RouterView />
</template>

<style lang='scss'>
@import 'App.scss';
</style>
