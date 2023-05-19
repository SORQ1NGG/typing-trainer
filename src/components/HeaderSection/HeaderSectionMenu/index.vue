<script>
export default {
    name: 'HeaderSectionMenu',
};
</script>

<script setup>
import Item from '@/components/items/HeaderMenuItems/index.vue';
import { ROUTE_NAMES } from '@/constants/router.js';

const items = [
    {
        id: 'main',
        text: 'Главная страница',
        to: { name: ROUTE_NAMES.MAIN },
    },
    {
        id: 'typing-test',
        text: 'Тестирование',
        to: { name: ROUTE_NAMES.TYPING_TEST },
    },
    {
        id: 'typing-tutor',
        text: 'Тренажер',
        to: { name: ROUTE_NAMES.TYPING_TUTOR },
    },
];
</script>

<template>
    <div class="header__menu">
        <Item
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            class="header-menu"
        />
    </div>
</template>

<style src="./style.scss" lang="scss" scoped />
