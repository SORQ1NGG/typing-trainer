<script>
export default {
    name: 'FieldInput',
};
</script>

<script setup>

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
                    <div class="field__input-cursor" />
                    <div class="field__input-str">
                        напечатай этот текст и узнай свою скорость печати
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style src="./style.scss" lang="scss" scoped />
