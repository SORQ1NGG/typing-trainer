<script>
export default {
    name: 'FieldInputTyping',
};
</script>

<script setup>
import { onMounted, ref } from 'vue';
import CurrentLetter from '@/components/CurrentLetter/index.vue';
import TestResult from '@/components/TestResult/index.vue';

const props = defineProps({
    fieldOfText: {
        type: [Object, String],
        default: '',
    },
});

const incorrectLetter = ref(false);
const passedLetter = ref(false);
const testStart = ref(false);
const currentKey = ref(null);
const intervalId = ref(null);
const incorrectLetterCount = ref(1);
const selectLetter = ref(0);
const typingSpeed = ref(0);
const typingTime = ref(0);
const typingAccuracy = ref(0);

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
        passedLetter.value = true;
        nextStep();
        if (selectLetter.value === 1) {
            startTest();
        } else if (selectLetter.value === props.fieldOfText.length - 1) {
            clearInterval(intervalId.value);
            console.log('stop');
            testStart.value = false;
        }
    } else {
        incorrectLetterCount.value += 1;
        incorrectLetter.value = false;
    }
    console.log(selectLetter.value);
};

const nextStep = () => {
    if (selectLetter.value >= 0 && selectLetter.value <= props.fieldOfText.length) {
        selectLetter.value += 1;
    }
};

const isAccuracy = value => {
    typingAccuracy.value = Math.round(100 - ((value / props.fieldOfText.length) * 100));
};

const startTest = () => {
    intervalId.value = setInterval(() => {
        typingTime.value += 1;
        typingSpeed.value = Math.round(selectLetter.value / typingTime.value * 60);
        isAccuracy(incorrectLetterCount.value);
    }, 1000);
    testStart.value = true;
};

const reloadButton = () => {
    if (selectLetter.value !== 0) {
        selectLetter.value = 0;
        testStart.value = false;
        typingAccuracy.value = 0;
        typingTime.value = 0;
        typingSpeed.value = 0;
        clearInterval(intervalId.value);
    }
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
                            :incorrect-letter="!incorrectLetter"
                            :passed-letter="passedLetter"
                            :select-letter="selectLetter"
                            :line-of-text="props.fieldOfText"
                        />
                    </div>
                    <div class="field__input-stats">
                        <TestResult>
                            <div class="field__input-stats__time stat">
                                <span>Время: <br> <strong class="field-stat">{{ typingTime }}</strong></span>
                            </div>
                            <div class="field__input-stats__speed stat">
                                <span>Скорость: <br> <strong class="field-stat">{{ typingSpeed }} </strong> зн/мин</span>
                            </div>
                            <div class="field__input-stats__accuracy stat">
                                <span>Точность: <br> <strong class="field-stat">{{ typingAccuracy }}</strong> %</span>
                            </div>
                        </TestResult>
                        <div>
                            <a
                                :class="{disable: selectLetter <= 0}"
                                class="field__input-stats_button"
                                @click.prevent="reloadButton"
                            >
                                Заново
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="selectLetter === props.fieldOfText.length" class="end">
            Тестирование окончено, взгляние на результаты.
        </div>
    </section>
</template>

<style src="./style.scss" lang="scss" scoped />
