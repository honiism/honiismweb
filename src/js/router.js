import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

// use component: () => import('path') for lazy-loading.
const routes = [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: "/:pathMatch(.*)*",
        component: Main
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router
