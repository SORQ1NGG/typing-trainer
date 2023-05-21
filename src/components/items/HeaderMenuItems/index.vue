<script>
export default {
    name: 'HeaderMenuItem',
};
</script>

<script setup>
const props = defineProps({
    id: {
        type: String,
        default: '',
    },
    tag: {
        type: String,
        default: 'router-link',
    },
    to: {
        type: [String, Object],
        default: '',
    },
    text: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <component
        :is="props.tag"
        :to="props.to"
        class="header-menu-item"
        active-class="header-menu-item--active"
    >
        <span class="header-menu-item__text">
            {{ props.text }}
        </span>
    </component>
</template>

<style src="./style.scss" lang="scss" scoped />
