<script>
export default {
    name: 'CardTest',
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { ROUTE_NAMES } from '@/constants/router.js';

const router = useRouter();

const btnLink = computed(() => {
    return { name: ROUTE_NAMES.TEST };
});
</script>

<template>
    <div class="field-cards">
        <div class="card" @click="router.push(btnLink)">
            BaconIpsum
        </div>
    </div>
</template>

<style src="./style.scss" lang="scss" scoped />
