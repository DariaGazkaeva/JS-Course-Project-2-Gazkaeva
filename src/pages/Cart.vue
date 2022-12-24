<template>
    <div class="cart">
        <div class="navigation">
            <router-link :to="{name: 'catalog', params: {}}">
                <div class="navigation-button">Каталог</div>
            </router-link>
            <router-link :to="{name: 'cart', params: {}}">
                <div class="navigation-button">Корзина</div>
            </router-link>
            <router-link :to="{name: 'orders', params: {orders: ORDERS}}">
                <div class="navigation-button">Сделанные заказы</div>
            </router-link>
            <router-link :to="{name: 'profile', params: {profile: USER}}">
                <div class="navigation-button">Личные данные</div>
            </router-link>
        </div>
        <h1>Корзина</h1>
        <p v-if="!cart.length">Пусто</p>
        <CartItem
            v-for="(item, index) in cart"
            :key="item.id"
            :cartItem="item"
            @removeFromCart="removeItem(index)"
            @decreaseCount="decreaseCount(index)"
            @increaseCount="increaseCount(index)"
        />
        <button @click="makeOrder(cart)" v-if="cart.length">Сделать заказ</button>
    </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Cart",
    components: {
        CartItem,
    },
    props: {
        cart: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        ...mapActions([
            'REMOVE_FROM_CART',
            'INCREASE_COUNT',
            'DECREASE_COUNT',
            'ADD_ORDERS',
            'CLEAR_CART',
            'SET_USER'
        ]),
        removeItem(index) {
            this.REMOVE_FROM_CART(index);
        },
        increaseCount(index) {
            this.INCREASE_COUNT(index);
        },
        decreaseCount(index) {
            this.DECREASE_COUNT(index);
        },
        makeOrder(cart) {
            if (this.USER.saved) {
                this.ADD_ORDERS(cart);
                this.CLEAR_CART();
                this.$router.push('orders');
            } else {
                alert('Заполните личные данные, чтобы сделать заказ')
            }
        }
    },
    created() {
        this.SET_USER(JSON.parse(window.localStorage.getItem('profile-form')));
    },
    computed: {
        ...mapGetters([
            'CART',
            'ORDERS',
            'USER',
        ])
    },
}
</script>

<style>
.cart {
    padding: 60px;
    background-color: #f4f4f4;
}
</style>
