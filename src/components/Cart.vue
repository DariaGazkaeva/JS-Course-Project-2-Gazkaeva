<template>
    <div class="cart">

        <Notification :text="notificationText" v-if="notificationIsShow"/>

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
                    <span>В количестве:</span> {{ openedModal.count }} шт.
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

        <h1>Корзина</h1>
        <p v-if="!CART.length">Пусто</p>
        <div class="cart__elements">
            <CartItem
                v-for="(item, index) in CART"
                :key="item.id"
                :cartItem="item"
                @removeFromCart="removeFromCart(index)"
                @decreaseCount="decreaseCount(index)"
                @increaseCount="increaseCount(index)"
                @openModal="openModal"
            />
        </div>
        <h2 class="cart__total" v-if="CART.length">Заказ на {{ calcTotal }} руб.</h2>
        <button class="cart__make-order-button" @click="makeOrder" v-if="CART.length">Сделать заказ</button>
    </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import Navigation from "@/components/Navigation";
import Notification from "@/components/Notification";
import ModalWindow from "@/components/ModalWindow.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Cart",
    components: {
        CartItem,
        Navigation,
        ModalWindow,
        Notification
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
            'REMOVE_ALL_FROM_CART',
            'INCREASE_COUNT',
            'DECREASE_COUNT',
            'ADD_ORDERS'
        ]),
        openModal(item) {
            this.openedModal = item;
            this.modalIsOpen = true;
        },
        closeModal() {
            this.modalIsOpen = false;
            this.openedModal = null;
        },
        removeAllFromCart() {
            this.REMOVE_ALL_FROM_CART();
        },
        removeFromCart(index) {
            this.REMOVE_FROM_CART(index);
        },
        increaseCount(index) {
            this.INCREASE_COUNT(index);
        },
        decreaseCount(index) {
            this.DECREASE_COUNT(index);
        },
        makeOrder() {
            if (this.USER.saved) {
                this.ADD_ORDERS(this.cart);
                this.removeAllFromCart();
                this.$router.push('orders');
            } else {
                this.requestPersonalData();
            }
        },
        requestPersonalData() {
            if (this.notificationIsShow === true) {
                this.notificationIsShow = false;
            }
            this.notificationText = 'Заполните личные данные, чтобы сделать заказ';
            this.notificationIsShow = true;
            setTimeout(() => {
                this.notificationIsShow = false
            }, 4000);
        }
    },
    computed: {
        ...mapGetters([
            'CART',
            'ORDERS',
            'USER',
        ]),
        calcTotal() {
            let total = 0;
            this.CART.forEach(item => {
                total += item.price * item.count;
            })
            return total;
        }
    },
    data() {
        return {
            modalIsOpen: false,
            openedModal: null,
            notificationText: '',
            notificationIsShow: false
        }
    }
}
</script>

<style>
.cart {
    padding: 60px;
    background-color: #f4f4f4;
    min-width: 85vw;
    min-height: 79vh;
}
.cart__elements {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.cart-item {
    margin-right: auto;
    margin-left: auto;
}

.cart__make-order-button {
    width: 20%;
    margin: auto;
    padding: 8px;
    display: inline-block;
    background-color: #00c022;
    border: none;
    color: white;
    border-radius: 2px;
    font-weight: bold;
    font-family: FreeMono, monospace;
    font-size: 18px;
    transition: all 0.2s;
}

.cart__make-order-button:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.cart__total {
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
}
</style>
