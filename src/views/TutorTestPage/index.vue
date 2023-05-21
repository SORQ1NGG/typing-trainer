<script>
export default {
    name: 'TutorTestPage',
};
</script>

<script setup>
import FieldInput from '@/components/fields/FieldInputTutor/index.vue';

const str = 'напечатай этот текст и узнай свою скорость печати';

</script>

<template>
    <FieldInput :field-of-text="str" />
</template>
