import { createWebHistory, createRouter } from "vue-router";

// defining route components
import MainPage from './components/MainPage.vue'
import LoginPage from './components/LoginPage.vue'

// definging the routes
const routes = [
    { path: '/', name: "Home Page", component: MainPage },
    { path: '/login', name: "Login", component: LoginPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;