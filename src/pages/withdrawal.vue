<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import { BinaryTree } from "~/classe/binary-tree";
import { BinaryTreeLevel } from "~/classe/binary-tree-level";
import { probaWithdraw } from "~/utils/withdrawal";

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

const probas = computed((): { success: number, proba: number }[] => {
    const tree = new BinaryTree<{ success: number; proba: number, factors: number[] }>(toWithdraw.value);
    tree.initTree();

    const level: BinaryTreeLevel<{ success: number; proba: number, factors: number[] }> = tree.getLastLevel();
    level.nodes.forEach(l => {
        l.data = {
            success: l.path.reduce((a,b) => a+b, 0),
            proba: 1,
            factors: [],
        };
        let success = 0;
        for (let i=0; i<l.path.length; i++) {
            let proba = probaWithdraw(maxPoint.value, currentPoint.value-success, withdrawal.value, dodge.value);
            success+= l.path[i];
            if (l.path[i] === 0) {
                proba = 1-proba;
            }
            l.data?.factors.push(proba*100);
            l.data.proba *= proba;
        }
    });
    const res: { success: number, proba: number }[] = [];

    for (let i=0; i<=toWithdraw.value; i++) {
        let probas = level.nodes.filter(n => n.data?.success === i).map(n => n.data?.proba || 0);
        res.push({
            success: i,
            proba: probas.reduce((a, b) => a + b, 0)*100,
        });
    }

    return res;
})

</script>

<template>
    <Card>
        <template #title>
            Data
        </template>
        <template #content>
            Your target have :
            <br>
            <InputNumber v-model="maxPoint" :min="0" :max="100" /> MP/AP max
            <br>
            currently <InputNumber v-model="currentPoint" :min="0" :max="100" /> MP/AP
            <br>
            <InputNumber v-model="dodge" :min="0" :max="1000" /> dodge
            <br>
            <br>
            <br>
            You have <InputNumber v-model="withdrawal" :min="0" :max="1000" /> withdrawal
            <br>
            and you want to withdraw <InputNumber v-model="toWithdraw" :min="0" :max="1000" /> MP/AP
        </template>
    </Card>

    <Card class="mt-4">
        <template #title>
            Result
        </template>
        <template #content>

            <DataTable
                :value="probas"
            >
                <Column field="success" header="number of PM/AP withdraw">
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                </Column>
                <Column field="proba" header="Chance of event">
                    <template #body="{ data, field }">
                        {{ data[field].toPrecision(4) }}%
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>

<style scoped>
</style>
