<template>
    <div class="catalog">

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
                    <span>Игроков:</span> {{ openedModal.players }}
                </div>
                <div class="product__title">
                    <span>Цена:</span> {{ openedModal.price }} руб.
                </div>
                <div class="product__title">
                    <span>Информация:</span> {{ openedModal.info }}
                </div>
                <div class="modal__buttons">
                    <button class="modal-button" @click="addToCartFromModal">В КОРЗИНУ</button>
                    <button class="modal-button" @click="removeFromCartFromModal">УДАЛИТЬ ИЗ КОРЗИНЫ</button>
                </div>
            </div>
        </ModalWindow>

        <Navigation/>

        <h1>Товары</h1>
        <div class="catalog__elements">
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                @addToCart="addToCart"
                @removeFromCart="removeFromCart"
                @openModal="openModal"
            />
        </div>
    </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import Navigation from "@/components/Navigation";
import Notification from "@/components/Notification";
import {mapActions, mapGetters} from "vuex";
import ModalWindow from "@/components/ModalWindow.vue";
import products from "../products.json";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Catalog",
    components: {
        Navigation, ProductCard, ModalWindow, Notification
    },
    methods: {
        ...mapActions([
            'ADD_TO_CART',
            'REMOVE_FROM_CART_BY_PRODUCT'
        ]),
        addToCart(product) {
            this.ADD_TO_CART(product);
            this.workOutNotification('Товар добавлен в корзину');
        },
        removeFromCart(product) {
            if (this.CART.includes(product)) {
                this.REMOVE_FROM_CART_BY_PRODUCT(product);
                this.workOutNotification('Товар удален из корзины');
            } else {
                this.workOutNotification('Такого товара нет в корзине');
            }
        },
        openModal(product) {
            this.modalIsOpen = true;
            this.openedModal = product;
        },
        closeModal() {
            this.modalIsOpen = false;
        },
        addToCartFromModal() {
            this.addToCart(this.openedModal);
        },
        removeFromCartFromModal() {
            this.removeFromCart(this.openedModal);
        },
        workOutNotification(text) {
            if (this.notificationIsShow === true) {
                this.notificationIsShow = false;
            }
            this.notificationText = text;
            this.notificationIsShow = true;
            setTimeout(() => {
                this.notificationIsShow = false
            }, 3000);
        }
    },
    computed: {
        ...mapGetters([
            'CART',
            'ORDERS',
            'USER'
        ])
    },
    data() {
        return {
            modalIsOpen: false,
            openedModal: null,
            products: products['products'],
            notificationText: '',
            notificationIsShow: false
        };
    },
}
</script>

<style>
.catalog {
    padding: 60px;
    background-color: #f4f4f4;
    min-width: 85vw;
    min-height: 79vh;
}

.catalog > h2 {
    margin-bottom: 20px;
}

.catalog__elements {
    display: flex;
    flex-wrap: wrap;
}

.card-block {
    margin-right: auto;
    margin-left: auto;
}

.notification {
    position: fixed;
    right: 10%;
    top: 5%;
    z-index: 9999;
}

</style>
