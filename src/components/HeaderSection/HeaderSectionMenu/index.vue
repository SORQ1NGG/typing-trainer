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
        id: 'lessons',
        text: 'Уроки',
        to: { name: ROUTE_NAMES.LESSONS },
    },
];
</script>

<template>
    <div class="bg-dark">
        <Item
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            class="header-menu"
        />
    </div>
</template>
