<template>
    <div class="orders">

        <ModalWindow
            v-if="modalIsOpen"
            @closeModal="closeModal"
        >
            <div class="modal__info-date">
                Дата: {{ new Date(openedModal.date).toLocaleDateString("ru-RU") }}
            </div>

            <div class="info"
                 v-for="order in openedModal.cart"
                 :key="order.id"
            >
                <div class="info__main">
                    <div class="modal__image">
                        <img :src="order.product.image" :alt="order.product.name">
                    </div>
                    <div class="modal__info-name">
                        {{ order.product.name }}
                    </div>
                    <div class="modal__title">
                        <span>Количество:</span> {{ order.count }}
                    </div>
                    <div class="modal__title">
                        <span>Цена за 1 шт.:</span> {{ order.product.price }} руб.
                    </div>
                    <div class="modal__title">
                        <span>Итого:</span> {{ order.product.price * order.count }} руб.
                    </div>
                </div>
                <div class="info_additional">
                    <div class="modal__title">
                        <span>Описание:</span> {{ order.product.info }}
                    </div>
                    <div class="modal__title">
                        <span>Игроков:</span> {{ order.product.players }}
                    </div>
                </div>
            </div>
        </ModalWindow>

        <div class="navigation">
            <router-link :to="{name: 'catalog', params: {}}">
                <div class="navigation-button">Каталог</div>
            </router-link>
            <router-link :to="{name: 'cart', params: {cart: CART}}">
                <div class="navigation-button">Корзина</div>
            </router-link>
            <router-link :to="{name: 'orders', params: {orders: ORDERS}}">
                <div class="navigation-button">Сделанные заказы</div>
            </router-link>
            <router-link :to="{name: 'profile', params: {profile: USER}}">
                <div class="navigation-button">Личные данные</div>
            </router-link>
        </div>

        <h1>Заказы</h1>

        <MadeOrder
            v-for="order in this.ORDERS"
            :key="order.id"
            :order="order"
            @openModal="openModal"
        />
        <button @click="clear" v-if="this.ORDERS.length">Очистить заказы</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MadeOrder from "@/components/MadeOrder.vue";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
    name: "MadeOrders",
    components: {MadeOrder, ModalWindow},
    data() {
        return {
            modalIsOpen: false,
            openedModal: null,
        }
    },
    methods: {
        ...mapActions([
            'CLEAR_ORDERS',
            'ADD_ORDERS',
            'ADD_ALL_ORDERS'
        ]),
        clear() {
            this.CLEAR_ORDERS();
            localStorage.removeItem('orders');
        },
        openModal(order) {
            this.openedModal = order;
            this.modalIsOpen = true;
        },
        closeModal() {
            this.modalIsOpen = false;
            this.openedModal = null;
        },
        getStorage() {
            return JSON.parse(window.localStorage.getItem('orders'));
        },
        setStorage() {
            localStorage.setItem('orders', JSON.stringify(this.ORDERS))
        },
    },
    created() {
        if (this.ORDERS.length === 0) {
            let storedOrders = this.getStorage();
            if (storedOrders.length !== 0) {
                storedOrders = JSON.parse(JSON.stringify(storedOrders));
                this.ADD_ALL_ORDERS(storedOrders);
            }
        } else {
            this.setStorage();
        }
    },
    computed: {
        ...mapGetters([
            'CART',
            'ORDERS',
            'USER'
        ]),
    },
}
</script>

<style>
.orders {
    padding: 60px;
    background-color: #f4f4f4;
}
.modal__info-date {
    font-size: 15px;
    font-weight: bold;
    margin: 10px;
}
.modal__image {
    width: 30%;
}
.modal__info-name {
    font-size: 30px;
    margin: 30px;
    font-weight: bold;
}
.modal__title {
    margin: 20px;
}
.info__main {
    font-weight: bold;
}
span {
    font-weight: bold;
}
.info_additional {
    display: flex;
    flex-direction: column;
}
</style>
