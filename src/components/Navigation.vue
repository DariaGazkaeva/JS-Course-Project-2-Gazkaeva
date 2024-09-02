<template>
    <div class="navigation">
        <router-link :to="{name: 'catalog', params: {}}">
            <div class="navigation-button">Каталог</div>
        </router-link>
        <router-link :to="{name: 'cart', params: {cart: CART}}">
            <div class="navigation-button">Корзина</div>
        </router-link>
        <router-link :to="{name: 'profile', params: {profile: USER}}">
            <div class="navigation-button">Личные данные</div>
        </router-link>
        <router-link :to="{name: 'orders', params: {orders: ORDERS}}">
            <div class="navigation-button">Заказы</div>
        </router-link>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Navigation",
    computed: {
        ...mapGetters([
            'CART',
            'ORDERS',
            'USER'
        ])
    },
}
</script>

<style>
.navigation {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.navigation-button {
    margin: 20px;
}
.navigation a, .navigation a:visited {
    color: black;
    transition-duration: 0.25s;
}
.navigation a:hover {
    background: #4d7dab;
    color: white;
    text-decoration: none;
}
</style>
