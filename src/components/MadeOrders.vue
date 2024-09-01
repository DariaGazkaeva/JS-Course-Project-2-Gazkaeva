<template>
    <div class="orders">
        <ModalWindow
            v-if="modalIsOpen"
            @closeModal="closeModal"
        >
            <img :src="openedModal.image" :alt="openedModal.name">
            <div class="modal__inner">
                <div class="product__info-name">
                    {{ openedModal.name }}
                </div>
                <div class="product__title">
                    <span>Заказано:</span> {{ openedModal.count }} шт.
                </div>
                <div class="product__title">
                    <span>Цена:</span> {{ openedModal.price }} руб.
                </div>
                <div class="product__title">
                    <span>Итого:</span> {{ openedModal.price * openedModal.count}} руб.
                </div>
                <div class="product__title">
                    <span>Информация:</span> {{ openedModal.info }}
                </div>
                <div class="product__title">
                    <span>Игроков:</span> {{ openedModal.players }}
                </div>
            </div>
        </ModalWindow>

        <Navigation/>

        <h1>Заказы</h1>
        <p v-if="!ORDERS.length">Пусто</p>

        <MadeOrder
            v-for="order in ORDERS"
            :key="order.id"
            :order="order"
            @openModal="openModal"
        />
        <button class="orders__clean-orders-button" @click="clear" v-if="ORDERS.length">Очистить заказы</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MadeOrder from "@/components/MadeOrder.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import Navigation from "@/components/Navigation";

export default {
    name: "MadeOrders",
    components: {MadeOrder, ModalWindow, Navigation},
    data() {
        return {
            modalIsOpen: false,
            openedModal: null,
        }
    },
    methods: {
        ...mapActions([
            'CLEAR_ORDERS'
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
        }
    },
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
.orders {
    padding: 60px;
    background-color: #f4f4f4;
    min-width: 85vw;
    min-height: 79vh;
}

.order {
    margin-right: auto;
    margin-left: auto;
}

.orders__clean-orders-button {
    width: 20%;
    margin: auto;
    padding: 8px;
    display: inline-block;
    background-color: #4d7dab;
    border: none;
    color: white;
    border-radius: 2px;
    font-weight: bold;
    font-family: FreeMono, monospace;
    font-size: 18px;
    transition: all 0.2s;
}

.orders__clean-orders-button:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}
</style>
