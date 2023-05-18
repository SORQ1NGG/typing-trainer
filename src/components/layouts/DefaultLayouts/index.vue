<script>
export default {
    name: 'DefaultLayout',
};
</script>

<script setup>
import FooterSection from '@/components/FooterSection/index.vue';
import HeaderSection from '@/components/HeaderSection/index.vue';
</script>

<template>
    <HeaderSection />
    <slot />
    <FooterSection />
</template>
