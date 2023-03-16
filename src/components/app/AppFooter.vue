<script setup lang='ts'>
const version = ref(import.meta.env.VITE_APP_VERSION);
</script>

<template>
    <div class="mt-4 layout-footer">
        <a href="https://github.com/lucas-pouchot/usagi-dofus-tools" target="_blank">GitHub</a>
        <span class="font-medium ml-2"> - Usagi's Dofus tools - v{{ version }}</span>
    </div>
</template>

<style scoped>

</style>
