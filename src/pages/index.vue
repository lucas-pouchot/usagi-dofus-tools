<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
const props = defineProps<{
    loading: boolean
    windowWidth: number
}>();

const { t } = useI18n();
const router = useRouter();

const layout = ref('grid');
const loading = ref(false);

const isLoading = computed((): boolean => {
    return loading.value || props.loading;
});

</script>

<template>
    <div class="surface-0 text-center">
        Hi
    </div>
</template>


<style scoped>
</style>
