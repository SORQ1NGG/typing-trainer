<script>
export default {
    name: 'FieldInputTyping',
};
</script>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { BaconIpsum } from '@/api/bacon-ipsum.js';
import CurrentLetter from '@/components/CurrentLetter/index.vue';
import TestResult from '@/components/TestResult/index.vue';
import BackButton from '@/components/ui/buttons/BackButton/index.vue';
import { useFields } from '@/composables/field-input.js';

const {
    handlerKey,
    reloadButton,
    items,
    typingAccuracy,
    typingSpeed,
    typingTime,
    incorrectLetter,
    selectLetter,
    passedLetter,
} = useFields();

const router = useRouter();

const loading = ref(false);

const getBaconIpsumText = async () => {
    loading.value = true;
    items.value = await BaconIpsum.getBaconIpsumText();
    loading.value = false;
};

onMounted(async () => {
    await getBaconIpsumText();
    document.addEventListener('keydown', handlerKey);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handlerKey);
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
                    <div class="field__input-str">
                        <CurrentLetter
                            :incorrect-letter="incorrectLetter"
                            :passed-letter="passedLetter"
                            :select-letter="selectLetter"
                            :items="items"
                            :loading="loading"
                        />
                    </div>
                    <div class="field__input-stats">
                        <TestResult>
                            <div class="field__input-stats__time stat">
                                <span>Время: <br> <strong class="field-stat">{{ typingTime }}</strong> сек.</span>
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
        <div v-show="selectLetter === items.length" class="end">
            Тестирование окончено, взгляние на результаты.
        </div>
    </section>
</template>

<style src="./style.scss" lang="scss" scoped />
