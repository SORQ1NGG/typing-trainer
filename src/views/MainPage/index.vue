<script>
export default {
    name: 'MainPage',
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '@/constants/router.js';
import TestButton from '@/components/ui/buttons/TestButton/index.vue';

const router = useRouter();
</script>

<template>
    <section class="content-container section">
        <img class="img" src="@/assets/img/img.png" alt="img">
        <div class="main-page">
            <h1 class="main-page__title">
                Печатай быстрее
            </h1>
            <p class="main-page__description">
                Научись быстро печатать с клавиатурным тренажером Keyboard Online. А уроки слепой печати помогут тебе использовать все 10 пальцев.
            </p>
            <TestButton @click="router.push({ name: ROUTE_NAMES.TYPING_TUTOR })">
                Начать печатать
            </TestButton>
        </div>
    </section>
</template>

<style src="./style.scss" lang="scss" scoped />
