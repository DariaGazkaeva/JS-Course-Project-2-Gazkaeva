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
            <router-link :to="{name: 'cart', params: {cart: CART}}">
                <div class="navigation-button">Корзина</div>
            </router-link>
            <router-link :to="{name: 'profile', params: {profile: USER}}">
                <div class="navigation-button">Личные данные</div>
            </router-link>
            <router-link :to="{name: 'orders', params: {orders: ORDERS}}">
                <div class="navigation-button">Сделанные заказы</div>
            </router-link>
        </div>

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
            'USER'
        ])
    },
    data() {
        return {
            modalIsOpen: false,
            openedModal: null,
            products: [
                {
                    id: 0,
                    name: 'Дженга',
                    image: 'https://irecommend.ru/sites/default/files/product-images/10297/8PVhXqeOEbR6SvyGwu9A.jpg',
                    price: 51,
                    players: '2-4',
                    info: 'Вы готовы противостоять закону гравитации? Тогда увлекательная настольная игра “Дженга” подарит вам море положительных эмоций и позволит потренировать ловкость рук и точность движений. Правила игры очень просты. Из ровных деревянных брусков строится башня, а затем игроки начинают аккуратно вытаскивать по одному бруску и ставить его наверх башни.',
                },
                {
                    id: 1,
                    name: 'Мафия',
                    image: 'https://cdn1.ozone.ru/s3/multimedia-8/6073814192.jpg',
                    price: 57,
                    players: 'от 6 человек',
                    info: 'Это культовая игра, но в новой — усовершенствованной версии. Что нужно для идеальной «Мафии»? Интересные роли, атмосферные карточки и подсказки для новичков. К классической настолке мы добавили 3 новые роли, чтобы каждая партия была неповторимой. И сделали удобный блокнот для ведущего и карты-подсказки, чтобы даже новички сразу стали гуру «Мафии».',
                },
                {
                    id: 2,
                    name: 'Имаджинариум',
                    image: 'https://cosmodrome.games/upload/resize_cache/iblock/961/500_400_1/961695f60221d67f976f8b7a80b5b105.jpg',
                    price: 57,
                    players: '2-6',
                    info: '«Имаджинариум» уникальная игра, где игроки пытаются понять ассоциации, эмоции и образы других игроков и донести свои фантазии и воображение.  Игра увлекает своей простотой – подбирайте ассоциации к картам, пытайтесь угадать чужие образы, развивайте воображение и веселитесь компанией!',
                },
                {
                    id: 3,
                    name: 'Свинтус',
                    image: 'https://4fishki.ru/images/stories/virtuemart/product/_______________516879e8c85e3.jpg',
                    price: 74,
                    players: '2-6',
                    info: 'Карточная игра "Свинтус" - простая, веселая и быстрая карточная игра! Цель игры предельно проста - избавиться от всех своих карт первым.',
                },
            ],
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
