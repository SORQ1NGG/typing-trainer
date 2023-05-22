<script>
export default {
    name: 'FieldInputTutor',
};
</script>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '@/constants/router.js';
import CurrentLetter from '@/components/CurrentLetter/index.vue';
import TestResult from '@/components/TestResult/index.vue';
import TestButton from '@/components/ui/buttons/TestButton/index.vue';

const props = defineProps({
    fieldOfText: {
        type: String,
        default: '',
    },
});

const router = useRouter();

const incorrectLetter = ref(false);
const passedLetter = ref(false);
const testStart = ref(false);
const currentKey = ref(null);
const intervalId = ref(null);
const incorrectLetterCount = ref(1);
const selectLetter = ref(0);
const typingSpeed = ref(0);
const typingTime = ref(0);

const compareLetter = char => {
    if (selectLetter.value <= props.fieldOfText.length - 1) {
        const correctLetter = props.fieldOfText[selectLetter.value];
        return correctLetter === char;
    } else if (selectLetter.value === props.fieldOfText.length - 1) {
        clearInterval(intervalId.value);
        testStart.value = false;
    }
};

const handlerKey = e => {
    const { key } = e;
    currentKey.value = key;
    if (compareLetter(key)) {
        incorrectLetter.value = true;
        nextStepLetter();
        if (selectLetter.value === 1) {
            passedLetter.value = true;
            startTest();
        } else if (selectLetter.value === props.fieldOfText.length - 1) {
            clearInterval(intervalId.value);
            testStart.value = false;
        }
    } else {
        incorrectLetterCount.value += 1;
        incorrectLetter.value = false;
    }
};

const nextStepLetter = () => {
    if (selectLetter.value >= 0 && selectLetter.value <= props.fieldOfText.length) {
        selectLetter.value += 1;
    }
};

const startTest = () => {
    intervalId.value = setInterval(() => {
        typingTime.value += 1;
        typingSpeed.value = Math.round(selectLetter.value / typingTime.value * 60);
    }, 1000);
    testStart.value = true;
};

onMounted(() => {
    document.addEventListener('keydown', e => {
        handlerKey(e);
    });
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
                            :incorrect-letter="!incorrectLetter"
                            :select-letter="selectLetter"
                            :line-of-text="props.fieldOfText"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="selectLetter === props.fieldOfText.length">
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
