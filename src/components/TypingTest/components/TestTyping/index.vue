<script>
export default {
    name: 'TestTyping',
};
</script>

<script setup>
import { onMounted, ref } from 'vue';
import { BaconIpsum } from '@/api/bacon-ipsum.js';
import FieldInputTyping from '@/components/fields/FieldsInputTyping/index.vue';

const items = ref([]);
const loading = ref(false);

const getBaconIpsumText = async () => {
    loading.value = true;
    items.value = await BaconIpsum.getBaconIpsumText();
    loading.value = false;
};

onMounted(() => {
    getBaconIpsumText();
});
</script>

<template>
    <FieldInputTyping :field-of-text="items" :loading="loading" />
</template>
