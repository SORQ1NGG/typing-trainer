<script>
export default {
    name: 'CurrentLetter',
};
</script>

<script setup>
import { computed } from 'vue';
import CircleLoader from '@/components/CircleLoader/index.vue';

const props = defineProps({
    selectLetter: {
        type: Number,
        default: 0,
    },
    incorrectLetter: {
        type: Boolean,
    },
    passedLetter: {
        type: Boolean,
    },
    items: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
    },
});

const isString = computed(() => {
    const resultString = [];
    let i = 0;
    props.items.toString().split('').forEach(letter => {
        resultString.push({ id: i, char: letter });
        i = i + 1;
    });
    return resultString;
});
</script>

<template>
    <div v-if="props.loading" class="field__input-loading">
        <CircleLoader />
    </div>
    <div v-else class="current-text">
        <span v-for="item in isString" :key="item.id" class="letters">
            <span v-if="item.id === props.selectLetter">
                <span class="select-letter" :class="{incorrect: props.incorrectLetter}">
                    {{ item.char }}
                </span>
            </span>
            <span v-else-if="item.id < props.selectLetter" :class="{passed: props.passedLetter}">
                {{ item.char }}
            </span>
            <span v-else>
                {{ item.char }}
            </span>
        </span>
    </div>
</template>

<style src="./style.scss" lang="scss" scoped />
