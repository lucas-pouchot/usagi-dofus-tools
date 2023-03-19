<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { BinaryTree } from '~/classe/binary-tree';
import type { BinaryTreeLevel } from '~/classe/binary-tree-level';
import { probaWithdraw } from '~/utils/withdrawal';

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

const toWithdraw = ref(4);

const maxPoint = ref(4);
const currentPoint = ref(4);
const withdrawal = ref(200);
const dodge = ref(100);

const probas = computed((): { success: number; proba: number }[] => {
    const tree = new BinaryTree<{ success: number; proba: number; factors: number[] }>(toWithdraw.value);
    tree.initTree();

    const level: BinaryTreeLevel<{ success: number; proba: number; factors: number[] }> = tree.getLastLevel();
    level.nodes.forEach((l) => {
        l.data = {
            success: l.path.reduce((a, b) => a + b, 0),
            proba: 1,
            factors: [],
        };
        let success = 0;
        for (let i = 0; i < l.path.length; i++) {
            let proba = probaWithdraw(maxPoint.value, currentPoint.value - success, withdrawal.value, dodge.value);
            success += l.path[i];
            if (l.path[i] === 0) {
                proba = 1 - proba;
            }
            l.data?.factors.push(proba * 100);
            l.data.proba *= proba;
        }
    });
    const res: { success: number; proba: number }[] = [];

    for (let i = 0; i <= toWithdraw.value; i++) {
        const probas = level.nodes.filter(n => n.data?.success === i).map(n => n.data?.proba || 0);
        res.push({
            success: i,
            proba: probas.reduce((a, b) => a + b, 0) * 100,
        });
    }

    return res;
});
</script>

<template>
    <Card>
        <template #title>
            {{ t('withdraw.data.title') }}
        </template>
        <template #content>
            <div class="grid grid-cols-2 gap-3 place-content-center">
                <div class="flex justify-end">
                    <div class="text-right align-middle pr-2 pt-1">{{ t('withdraw.data.theTargetHasMax') }}</div>
                    <InputNumber v-model="maxPoint" class="withdraw-input  p-inputtext-sm" show-buttons button-layout="horizontal" :step="1" :min="0" :max="100" increment-button-icon="pi pi-plus" decrement-button-icon="pi pi-minus" />
                </div>
                <div class="flex text-left align-middle pt-1">{{ t('withdraw.data.mpAp') }}</div>

                <div class="flex justify-end">
                    <div class="text-right align-middle pr-2 pt-1">{{ t('withdraw.data.theTargetHasCurrently') }}</div>
                    <InputNumber v-model="currentPoint" class="withdraw-input  p-inputtext-sm" show-buttons button-layout="horizontal" :step="1" :min="0" :max="100" increment-button-icon="pi pi-plus" decrement-button-icon="pi pi-minus" />
                </div>
                <div class="flex text-left align-middle pt-1">{{ t('withdraw.data.mpAp') }}</div>

                <div class="flex justify-end">
                    <div class="text-right align-middle pr-2 pt-1">{{ t('withdraw.data.theTargetHas') }}</div>
                    <InputNumber v-model="dodge" class="withdraw-input  p-inputtext-sm" show-buttons button-layout="horizontal" :step="1" :min="0" :max="1000" increment-button-icon="pi pi-plus" decrement-button-icon="pi pi-minus" />
                </div>
                <div class="flex text-left align-middle pt-1">{{ t('withdraw.data.dodge') }}</div>
            </div>

            <div class="grid grid-cols-2 gap-3 place-content-center mt-10">
                <div class="flex justify-end">
                    <div class="text-right align-middle pr-2 pt-1">{{ t('withdraw.data.playerHave') }}</div>
                    <InputNumber v-model="withdrawal" class="withdraw-input  p-inputtext-sm" show-buttons button-layout="horizontal" :step="1" :min="0" :max="1000" increment-button-icon="pi pi-plus" decrement-button-icon="pi pi-minus" />
                </div>
                <div class="flex text-left align-middle pt-1">{{ t('withdraw.data.withdrawal') }}</div>

                <div class="flex justify-end">
                    <div class="text-right align-middle pr-2 pt-1">{{ t('withdraw.data.wantToWithdraw') }}</div>
                    <InputNumber v-model="toWithdraw" class="withdraw-input  p-inputtext-sm" show-buttons button-layout="horizontal" :step="1" :min="0" :max="1000" increment-button-icon="pi pi-plus" decrement-button-icon="pi pi-minus" />
                </div>
                <div class="flex text-left align-middle pt-1">{{ t('withdraw.data.mpAp') }}</div>
            </div>
        </template>
    </Card>

    <Card class="mt-4">
        <template #title>
            {{ t('withdraw.result.title') }}
        </template>
        <template #content>
            <DataTable
                :value="probas"
            >
                <Column field="success" :header="t('withdraw.result.numberWithdrew')">
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                </Column>
                <Column field="proba" :header="t('withdraw.result.chanceOfEvent')">
                    <template #body="{ data, field }">
                        {{ data[field].toPrecision(4) }}%
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>

<style scoped>
.withdraw-input :deep(.p-inputtext) {
    width: 64px;
}
</style>
