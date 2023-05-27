<script>
export default {
    name: 'FieldInputTutor',
};
</script>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '@/constants/router.js';
import CurrentLetter from '@/components/CurrentLetter/index.vue';
import TestResult from '@/components/TestResult/index.vue';
import TestButton from '@/components/ui/buttons/TestButton/index.vue';
import { useFields } from '@/composables/field-input.js';

const {
    handlerKey,
    typingSpeed,
    items,
    incorrectLetter,
    selectLetter,
    passedLetter,
} = useFields();

const router = useRouter();
items.value = 'напечатай этот текст и узнай свою скорость печати';

onMounted(async () => {
    document.addEventListener('keydown', handlerKey);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handlerKey);
});
</script>

<template>
    <section class="content-container">
        <div class="field">
            <div class="field__inner">
                <input
                    class="field__input"
                    spellcheck="false"
                    autocomplete="off"
                    type="text"
                >
                <div class="field__input-text">
                    <div class="field__input-str">
                        <CurrentLetter
                            :passed-letter="passedLetter"
                            :incorrect-letter="incorrectLetter"
                            :select-letter="selectLetter"
                            :items="items"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="selectLetter === items.length">
            <TestResult>
                <div class="test-result__title">
                    <h2>Результаты теста</h2>
                </div>
                <div class="test-result__data">
                    <div class="test-result__speed">
                        <h3>Скорость (зн/мин): {{ typingSpeed }}</h3>
                    </div>
                </div>
            </TestResult>
            <TestButton @click="router.push({ name: ROUTE_NAMES.TYPING_LIST })">
                Улучшить скорость печати
            </TestButton>
        </div>
    </section>
</template>

<style src="./style.scss" lang="scss" scoped />
