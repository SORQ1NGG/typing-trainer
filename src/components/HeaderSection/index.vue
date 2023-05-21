<script>
export default {
    name: 'HeaderSection',
};
</script>

<script setup>
import Menu from '@/components/HeaderSection/HeaderSectionMenu/index.vue';
import LogoLink from '@/components/LogoLink/index.vue';
</script>

<template>
    <header
        class="header"
    >
        <div class="header__inner">
            <div class="content-container header__content">
                <LogoLink />
                <Menu />
            </div>
        </div>
    </header>
</template>

<style src="./style.scss" lang="scss" scoped />
