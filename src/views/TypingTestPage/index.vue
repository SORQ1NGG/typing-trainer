<script>
export default {
    name: 'TypingTestPage',
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '@/constants/router.js';

const router = useRouter();
</script>

<template>
    <section class="content-container">
        <div class="field-cards" @click="router.push({ name: ROUTE_NAMES.TEST_TYPING })">
            <div class="card">
                BaconIpsum
            </div>
        </div>
    </section>
</template>

<style src="./style.scss" lang="scss" scoped />
