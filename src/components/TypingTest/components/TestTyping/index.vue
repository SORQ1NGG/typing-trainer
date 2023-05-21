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

const getBaconIpsumText = async () => {
    items.value = await BaconIpsum.getBaconIpsumText();
};

onMounted(() => {
    getBaconIpsumText();
});
</script>

<template>
    <FieldInputTyping :field-of-text="items" />
</template>
