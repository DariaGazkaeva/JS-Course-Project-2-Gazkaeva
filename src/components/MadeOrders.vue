<template>
    <div class="orders">

        <ModalWindow
            v-if="modalIsOpen"
            @closeModal="closeModal"
        >
            <img :src="openedModal.image" :alt="openedModal.name">
            <div class="product__info-name">
                {{ openedModal.name }}
            </div>
            <div class="product__title">
                <span>Цена:</span> {{ openedModal.price }}
            </div>
            <div class="product__title">
                <span>Количество:</span> {{ openedModal.count }}
            </div>
            <div class="product__title">
                <span>Информация:</span> {{ openedModal.info }}
            </div>
            <div class="product__title">
                <span>Игроков:</span> {{ openedModal.players }}
            </div>
        </ModalWindow>

        <div class="navigation">
            <router-link :to="{name: 'catalog', params: {}}">
                <div class="navigation-button">Каталог</div>
            </router-link>
            <router-link :to="{name: 'profile', params: {profile: USER}}">
                <div class="navigation-button">Личные данные</div>
            </router-link>
            <router-link :to="{name: 'cart', params: {cart: CART}}">
                <div class="navigation-button">Корзина</div>
            </router-link>
        </div>

        <h1>Заказы</h1>

        <MadeOrder
            v-for="order in ORDERS"
            :key="order.id"
            :order="order"
            @openModal="openModal"
        />
        <button @click="clear" v-if="ORDERS.length">Очистить заказы</button>
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
            'ADD_ORDERS'
        ]),
        clear() {
            this.CLEAR_ORDERS();
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
            let storage = [];
            let storageAsString = window.localStorage.getItem('orders');
            let startIndex = 0;
            for (let i = 0; i < storageAsString.length; i++) {
                if (storageAsString[i] === '[' || storageAsString[i] === ']') {
                    startIndex++;
                } else if (storageAsString[i] === '}') {
                    storage.push(JSON.parse(storageAsString.substring(startIndex, i + 1)));
                    startIndex = i + 1;
                }
            }
            return storage;
        },
        setStorage() {
            localStorage.setItem('orders', JSON.stringify(this.ORDERS))
        },
        updateStorage() {
            let storage = this.getStorage();
            if (!storage) storage = {};
            storage = JSON.parse(JSON.stringify(this.ORDERS));
            this.setStorage(storage);
        }
    },
    created() {
        if (this.ORDERS.length === 0) {
            let storedOrders = this.getStorage();
            this.ADD_ORDERS(storedOrders);
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
</style>
