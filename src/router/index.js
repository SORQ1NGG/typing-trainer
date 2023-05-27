import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_NAMES } from '@/constants/router.js';

const routeOptions = [
    {
        path: '/',
        name: ROUTE_NAMES.MAIN,
        component: () => import('@/views/MainPage/index.vue'),
    },
    {
        path: '/typing-test/',
        name: ROUTE_NAMES.TYPING_TEST,
        component: () => import('@/views/TypingTestPage/index.vue'),
        children: [
            {
                path: '',
                name: ROUTE_NAMES.TYPING_LIST,
                component: () => import('@/components/TypingTest/index.vue'),
            },
            {
                path: 'test',
                name: ROUTE_NAMES.TEST,
                component: () => import('@/components/fields/FieldsInputTyping/index.vue'),
            },
        ],
    },
    {
        path: '/typing-tutor/',
        name: ROUTE_NAMES.TYPING_TUTOR,
        component: () => import('@/components/fields/FieldInputTutor/index.vue'),
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
