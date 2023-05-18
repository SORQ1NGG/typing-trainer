<script>
export default {
    name: 'LessonsPage',
};
</script>

<template>
    <div>
        Lessons page
    </div>
    <router-link :to="{ name: 'Workout' }">
        Workout
    </router-link>
</template>
