<template>
    <div class="catalog">

        <ModalWindow
            v-if="modalIsOpen"
            @closeModal="closeModal"
        >
            <div class="modal__header">
                <button class="modal-button" @click="addToCartFromModal">В корзину</button>
                <button class="modal-button" @click="removeFromCartFromModal">Удалить из корзины</button>
            </div>

            <img :src="openedModal.image" :alt="openedModal.name">
            <div class="product__info-name">
                {{ openedModal.name }}
            </div>
            <div class="product__title">
                <span>Цена:</span> {{ openedModal.price }}
            </div>
            <div class="product__title">
                <span>Информация:</span> {{ openedModal.info }}
            </div>
            <div class="product__title">
                <span>Игроков:</span> {{ openedModal.players }}
            </div>
        </ModalWindow>

        <div class="navigation">
            <router-link :to="{name: 'catalog', params: {catalog: PRODUCTS}}">
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

        <h1>Товары</h1>
        <div class="catalog__elements">
            <ProductCard
                v-for="product in PRODUCTS"
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
import {mapActions, mapGetters} from "vuex";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Catalog",
    components: {
        ProductCard, ModalWindow
    },
    methods: {
        ...mapActions([
            'ADD_TO_CART',
            'REMOVE_FROM_CART_BY_PRODUCT'
        ]),
        addToCart(product) {
            this.ADD_TO_CART(product);
        },
        removeFromCart(product) {
            if (this.CART.includes(product)) {
                this.REMOVE_FROM_CART_BY_PRODUCT(product);
            } else {
                alert('Такого товара нет в корзине');
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
            this.ADD_TO_CART(this.openedModal);
        },
        removeFromCartFromModal() {
            this.removeFromCart(this.openedModal);
        },
    },
    computed: {
        ...mapGetters([
            'CART',
            'ORDERS',
            'USER',
            'PRODUCTS',
        ])
    },
    data() {
        return {
            modalIsOpen: false,
            openedModal: null,
        };
    },
}
</script>

<style>
.catalog {
    padding: 60px;
    background-color: #f4f4f4;
}

.catalog > h2 {
    margin-bottom: 20px;
}

.catalog__elements {
    display: flex;
    flex-wrap: wrap;
}

.navigation-button {
    text-decoration: black;
    color: black;
}
.navigation-button:visited {
    color: black;
}
.modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
}
</style>
