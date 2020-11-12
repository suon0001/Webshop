import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Xbox from '../views/Xbox.vue'
import Playstation from '../views/Playstation.vue'
import Nintendo from '../views/Nintendo.vue'
import Pc from '../views/Pc.vue'
import Basket from '../views/Basket.vue'
import Admin from '../views/Admin.vue'
import AddNewItems from '../components/admin/AddNewItems.vue'
import Login from '../components/admin/Login.vue'
import Checkout from '../components/Checkout.vue'
import Code from '../components/Code.vue'

import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/xbox',
        name: 'Xbox',
        component: Xbox
    },

    {
        path: '/playstation',
        name: 'Playstation',
        component: Playstation
    },

    {
        path: '/nintendo',
        name: 'Nintendo',
        component: Nintendo
    },

    {
        path: '/pc',
        name: 'Pc',
        component: Pc
    },

    {
        path: '/basket',
        name: 'Basket',
        component: Basket
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },

    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '*',
        redirect: '/'
    },

    {
        path: '/addNew',
        name: 'addNew',
        component: AddNewItems,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
    },

    {
        path: '/code',
        name: 'Code',
        component: Code,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else next();
})

export default router