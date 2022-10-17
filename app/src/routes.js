import { createWebHistory, createRouter } from 'vue-router'

// defining route components
import MainPage from './components/MainPage.vue'
import LoginPage from './components/LoginPage.vue'
import BeerInfo from './components/BeerInfo.vue'

// definging the routes
const routes = [
    { path: '/', name: 'HomePage', component: MainPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/beer/:id', name: 'BeerInfo', component: BeerInfo },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// validate each route if the user is logged in
router.beforeEach(async (to) => {
    // get the x-user from the localstorage
    const user = localStorage.getItem('x-user')

    // navigate to login page if not authenticated
    if (!user && to.name !== 'Login') {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})

export default router
