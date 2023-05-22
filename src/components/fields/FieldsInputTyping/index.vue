<script>
export default {
    name: 'FieldInputTyping',
};
</script>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CurrentLetter from '@/components/CurrentLetter/index.vue';
import TestResult from '@/components/TestResult/index.vue';
import BackButton from '@/components/ui/buttons/BackButton/index.vue';
import CircleLaoder from '@/components/CircleLoader/index.vue';

const props = defineProps({
    fieldOfText: {
        type: [Object, String],
        default: '',
    },
    loading: {
        type: Boolean,
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
        incorrectLetter.value = false;
        passedLetter.value = true;
        nextStepLetter();
        if (selectLetter.value === 1) {
            startTest();
        } else if (selectLetter.value === props.fieldOfText.length - 1) {
            clearInterval(intervalId.value);
            testStart.value = false;
        }
    } else {
        incorrectLetterCount.value += 1;
        incorrectLetter.value = true;
    }
    if (e.shiftKey) {
        incorrectLetterCount.value = 0;
        incorrectLetter.value = false;
    }
};

const nextStepLetter = () => {
    if (selectLetter.value >= 0 && selectLetter.value <= props.fieldOfText.length) {
        selectLetter.value += 1;
    }
};

const isAccuracy = value => {
    typingAccuracy.value = 100 - ((value / props.fieldOfText.length) * 100).toFixed(1);
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
        typingAccuracy.value = 0;
        typingTime.value = 0;
        typingSpeed.value = 0;
        testStart.value = false;
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
            <div class="field__button-back">
                <BackButton @click="router.go(-1)" />
            </div>
            <div class="field__inner">
                <input
                    class="field__input"
                    spellcheck="false"
                    autocomplete="off"
                    type="text"
                >
                <div class="field__input-text">
                    <div v-if="props.loading" class="field__input-loading">
                        <CircleLaoder />
                    </div>
                    <div v-else class="field__input-str">
                        <CurrentLetter
                            :incorrect-letter="incorrectLetter"
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
