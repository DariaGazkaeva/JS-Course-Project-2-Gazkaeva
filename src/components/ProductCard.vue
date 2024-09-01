<template>
    <div class="card-block">
        <div class="card-block__image" @click="openModal">
            <img :src="product.image">
        </div>
        <div class="card-block__info" @click="openModal">
            <div class="product__info-name">
                {{ product.name }}
            </div>
            <div class="product__title">
                <span>Цена:</span> {{ product.price }} руб.
            </div>
            <div class="product__title">
                <span>Информация:</span> {{ product.info }}
            </div>
        </div>
        <div class="control-button">
            <button class="card-block" @click="addToCart">В КОРЗИНУ</button>
            <button class="card-block" @click="removeFromCart">УДАЛИТЬ ИЗ КОРЗИНЫ</button>
            <button class="card-block" @click="openModal">ПОДРОБНЕЕ</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "ProductCard",
    data() {
        return {}
    },
    props: {
        product: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        addToCart() {
             this.$emit('addToCart', this.product)
        },
        removeFromCart() {
            this.$emit('removeFromCart', this.product)
        },
        openModal() {
            this.$emit('openModal', this.product)
        },
    }
}
</script>

<style>
.card-block {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    background-color: #ffffff;
    min-height: 90px;
    padding: 12px;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
}

.card-block button {
    width: 80%;
    min-height: 25%;
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
}

.card-block:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.card-block__image {
    width: 33%;
    height: 80%;
}

.card-block__image img {
    max-width: 100%;
    max-height: 100%;
}

.card-block__info {
    width: 67%;
    margin-left: 10px;
    line-height: 25px;
    word-wrap: break-word;
}

.product__info-name {
    font-size: 25px;
    font-weight: bold;
    margin: 20px;
}

.product__title {
    font-size: 16px;
    margin: 10px;
}

.product__title span {
    font-weight: bold;
}

.control-button {
    display: flex;
    flex-direction: column;
}
</style>
