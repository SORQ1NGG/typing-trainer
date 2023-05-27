import { ref } from 'vue';

export function useFields () {
    const incorrectLetter = ref(false);
    const passedLetter = ref(false);
    const testStart = ref(false);

    const currentKey = ref(null);
    const intervalId = ref(null);

    const incorrectLetterCount = ref(0);
    const selectLetter = ref(0);

    const typingSpeed = ref(0);
    const typingTime = ref(0);
    const typingAccuracy = ref(0);

    const items = ref([]);

    const compareLetter = char => {
        if (selectLetter.value <= items.value.length - 1) {
            const correctLetter = items.value[selectLetter.value];
            return correctLetter === char;
        } else if (selectLetter.value === items.value.length - 1) {
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
            } else if (selectLetter.value === items.value.length - 1) {
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
        if (selectLetter.value >= 0 && selectLetter.value <= items.value.length) {
            selectLetter.value += 1;
        }
    };

    // const isTypingTime = computed(() => {
    //     const date = new Date(typingTime.value);
    //     return `${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    // });

    // const isTypingAccuracy = computed(() => {
    //     const incorrect = incorrectLetterCount.value;
    //     return 100 - ((incorrect / items.value.length) * 100).toFixed(1);
    // });

    // const isTypingSpeed = computed(() => {
    //     const time = typingTime.value;
    //     return Math.round(selectLetter.value / time * 60);
    // });

    const startTest = () => {
        intervalId.value = setInterval(() => {
            typingTime.value += 1;
            typingSpeed.value = Math.round((items.value.length / typingTime.value) * selectLetter.value); // V=(Q/T)*K
            typingAccuracy.value = 100 - (incorrectLetterCount.value / items.value.length * 100).toFixed(1);
        }, 1000);
        testStart.value = true;
    };

    const reloadButton = () => {
        if (selectLetter.value !== 0) {
            selectLetter.value = 0;
            typingAccuracy.value = 0;
            typingTime.value = 0;
            typingSpeed.value = 0;
            incorrectLetterCount.value = 0;
            testStart.value = false;
            clearInterval(intervalId.value);
        }
    };

    return {
        incorrectLetter,
        passedLetter,
        testStart,
        currentKey,
        incorrectLetterCount,
        selectLetter,
        items,
        typingTime,
        typingSpeed,
        typingAccuracy,
        handlerKey,
        reloadButton,
    };
}
