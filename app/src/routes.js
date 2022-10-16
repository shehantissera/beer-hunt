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

// validate each route if the user is logged in
router.beforeEach(async (to, from) => {

    // get the x-user from the localstorage
    const user = localStorage.getItem('x-user');

    // navigate to login page if not authenticated
    if (!user && to.name !== 'Login') {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})

export default router;