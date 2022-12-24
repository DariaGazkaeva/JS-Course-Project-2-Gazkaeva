import Vue from 'vue';
import Router from 'vue-router';

import Catalog from "@/pages/Catalog.vue";
import Cart from "@/pages/Cart.vue";
import Profile from "@/pages/Profile.vue";
import MadeOrders from "@/pages/MadeOrders.vue";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: Catalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            props: true
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/orders',
            name: 'orders',
            component: MadeOrders,
            props: true
        },
    ]
})

export default router;
