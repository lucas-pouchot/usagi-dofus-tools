<script setup lang='ts'>
import type { MenuItemInterface } from '~/logic/navigation';

interface Props {
    items?: Array<MenuItemInterface>
    root?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    root: false,
});

const emit = defineEmits(['menuItemClick']);

const activeIndex = ref(null);
function onmenuItemClick(event: { preventDefault: () => void }, item: MenuItemInterface, index: any) {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    if (!item.to && !item.url) { event.preventDefault(); }

    // execute command
    if (item.command) { item.command({ originalEvent: event, item }); }

    activeIndex.value = index === activeIndex.value ? null : index;

    emit('menuItemClick', {
        originalEvent: event,
        item,
    });
}

function visible(item: any) {
    return (typeof item.visible === 'function' ? item.visible() : item.visible !== false);
}
</script>

<template>
    <ul v-if="items">
        <template v-for="(item, i) of items">
            <li
                v-if="visible(item) && !item.separator" :key="item.label || i"
                :class="[{ 'layout-menuitem-category': root, 'active-menuitem': activeIndex === i && !item.to && !item.disabled, 'ml-minus-1': !!item.item }]"
                role="none"
            >
                <template v-if="root">
                    <div v-if="!item.item" class="layout-menuitem-root-text">
                        {{ item.label }}
                    </div>
                    <template v-else>
                        <router-link
                            v-if="item.item.to" v-ripple :to="item.item.to"
                            class="p-ripple" :class="[item.item.class, { 'p-disabled': item.item.disabled }]" :style="item.item.style" :target="item.item.target" exact
                            role="menuitem" @click="onmenuItemClick($event, item.item, i)"
                        >
                            <i v-if="item.item.icon && item.item.icon.indexOf('pi-') !== -1" class="pi" :class="item.item.icon" />
                            <span v-else-if="item.item.icon" :class="item.item.icon"></span>
                            <span>{{ item.label }}</span>
                            <i v-if="item.item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon" />
                            <span v-if="item.item.badge" class="menuitem-badge">{{ item.item.badge }}</span>
                        </router-link>
                        <a
                            v-if="!item.item.to" v-ripple :href="item.item.url || '#'"
                            :style="item.item.style" class="p-ripple" :class="[item.item.class, { 'p-disabled': item.item.disabled }]"
                            :target="item.item.target" role="menuitem" @click="onmenuItemClick($event, item.item, i)"
                        >
                            <i v-if="item.item.icon && item.item.icon.indexOf('pi-') !== -1" class="pi" :class="item.item.icon" />
                            <span v-else-if="item.item.icon" :class="item.item.icon"></span>
                            <span>{{ item.label }}</span>
                            <i v-if="item.item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon" />
                            <span v-if="item.item.badge" class="menuitem-badge">{{ item.item.badge }}</span>
                        </a>
                        <transition name="layout-submenu-wrapper">
                            <AppSubmenu
                                v-show="activeIndex === i" :items="visible(item.item) && item.item.items"
                                @menu-item-click="$emit('menuItemClick', $event)"
                            />
                        </transition>
                    </template>
                    <AppSubmenu
                        :items="visible(item) && item.items"
                        @menu-item-click="$emit('menuItemClick', $event)"
                    />
                </template>
                <template v-else>
                    <router-link
                        v-if="item.to" v-ripple :to="item.to"
                        class="p-ripple" :class="[item.class, { 'p-disabled': item.disabled }]" :style="item.style" :target="item.target" exact
                        role="menuitem" @click="onmenuItemClick($event, item, i)"
                    >
                        <i v-if="item.icon && item.icon.indexOf('pi-') !== -1" class="pi" :class="item.icon" />
                        <span v-else-if="item.icon" :class="item.icon"></span>
                        <span>{{ item.label }}</span>
                        <i v-if="!item.to && item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon" />
                        <span v-if="item.badge" class="menuitem-badge">{{ item.badge }}</span>
                    </router-link>
                    <a
                        v-if="!item.to" v-ripple :href="item.url || '#'"
                        :style="item.style" class="p-ripple" :class="[item.class, { 'p-disabled': item.disabled }]"
                        :target="item.target" role="menuitem" @click="onmenuItemClick($event, item, i)"
                    >
                        <i v-if="item.icon && item.icon.indexOf('pi-') !== -1" class="pi" :class="item.icon" />
                        <span v-else-if="item.icon" :class="item.icon"></span>
                        <span>{{ item.label }}</span>
                        <i v-if="!item.to && item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon" />
                        <span v-if="item.badge" class="menuitem-badge">{{ item.badge }}</span>
                    </a>
                    <transition v-if="!item.to" name="layout-submenu-wrapper">
                        <AppSubmenu
                            v-show="activeIndex === i" :items="visible(item) && item.items"
                            @menu-item-click="$emit('menuItemClick', $event)"
                        />
                    </transition>
                    <transition v-else name="layout-submenu-wrapper">
                        <AppSubmenu
                            :items="visible(item) && item.items"
                            @menu-item-click="$emit('menuItemClick', $event)"
                        />
                    </transition>
                </template>
            </li>
            <li
                v-if="visible(item) && item.separator" :key="`separator${i}`" class="p-menu-separator" :style="item.style"
                role="separator"
            />
        </template>
    </ul>
</template>

<style scoped>
.ml-minus-1 {
    margin-left: -1rem;
}
</style>
