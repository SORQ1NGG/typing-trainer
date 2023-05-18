import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_NAMES } from '@/constants/router.js';

const routeOptions = [
    {
        path: '/',
        name: ROUTE_NAMES.MAIN,
        component: () => import('@/views/MainPage/index.vue'),
    },
    {
        path: '/lessons/',
        name: ROUTE_NAMES.LESSONS,
        component: () => import('@/views/LessonsPage/index.vue'),
        children: [
            {
                path: 'workout',
                name: ROUTE_NAMES.WORKOUT,
                component: () => import('@/views/WorkoutPage/index.vue'),
            },
        ],
    },
];

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
    ...routeOptions.map(route => ({
        ...route,
        // component: async () => {
        //     let component = null;
        //
        //     try {
        //         component = await import('@/views/' + route.name + 'Page/index.vue');
        //     } catch (e) {
        //         console.error(e);
        //     }
        //     return component;
        // },
    })),
];

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
    scrollBehavior (to) {
        return to.hash ? { el: to.hash } : { top: 0 };
    },
});

export default router;
