<script setup>
import { defineAsyncComponent, ref, shallowRef } from 'vue';

const root = ref(null);
const DefaultLayout = defineAsyncComponent(() => import('@/components/layouts/DefaultLayouts/index.vue'));
const pageLayout = shallowRef(DefaultLayout);
</script>

<template>
    <div
        ref="root"
        class="app"
    >
        <router-view v-slot="{ Component }">
            <component :is="pageLayout">
                <component :is="Component" class="page" />
            </component>
        </router-view>
    </div>
</template>
