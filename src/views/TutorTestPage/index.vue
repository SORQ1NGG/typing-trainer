<script>
export default {
    name: 'TutorTestPage',
};
</script>

<script setup>
import FieldInputTutor from '@/components/fields/FieldInputTutor/index.vue';

const str = 'напечатай этот текст и узнай свою скорость печати';

</script>

<template>
    <FieldInputTutor :field-of-text="str" />
</template>
