import Vue from 'vue';
import Router from 'vue-router';

import Catalog from "@/components/Catalog.vue";
import Cart from "@/components/Cart.vue";
import Profile from "@/components/Profile.vue";
import MadeOrders from "@/components/MadeOrders.vue";

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
