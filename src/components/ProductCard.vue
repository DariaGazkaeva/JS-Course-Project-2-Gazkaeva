<template>
    <div class="card-block">
        <div class="card-block__image">
            <img :src="product.image">
        </div>
        <div class="card-block__info">
            <div class="product__info-name">
                {{ product.name }}
            </div>
            <div class="product__title">
                Цена: {{ product.price }}
            </div>
            <div class="product__title">
                <span>Информация:</span> {{ product.info }}
            </div>
        </div>
        <div class="control-button">
            <button class="card-block" @click="addToCart">В корзину</button>
            <button class="card-block" @click="removeFromCart">Удалить из корзины</button>
            <button class="card-block" @click="openModal">Развернуть</button>
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
    height: 200px;
    padding: 12px;
    margin-right: 20px;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
}

.card-block button {
    width: 80%;
    height: 25%;
    border-radius: 10px;
    border-color: #aeaeae;
    margin: auto;
    padding: 8px;
    display: inline-block;
    background-color: #f4f4f4;
}

.card-block:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.card-block__image {
    width: 33%;
}

.card-block__info {
    width: 67%;
    margin-left: 10px;
}

.card-block img {
    max-width: 100%;
    max-height: 97%;
    min-height: 90%;
}

.product__info-name {
    font-size: 18px;
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
