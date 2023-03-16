<script setup lang='ts'>
import AppSubmenu from './AppSubmenu.vue';
import type { MenuItemInterface } from '~/logic/navigation';

const props = defineProps<{
    model: Array<MenuItemInterface>
}>();

const emit = defineEmits(['menuItemClick']);

function homeMenuClick(event: any) {
    emit('menuItemClick', {
        originalEvent: event,
        item: { to: '/' },
    });
}

function onmenuItemClick(event: any) {
    emit('menuItemClick', event);
}
</script>

<template>
    <div class="layout-menu-container">
        <AppSubmenu :items="model" class="layout-menu" :root="true" @menu-item-click="onmenuItemClick" />
    </div>
</template>

<style scoped>

</style>
