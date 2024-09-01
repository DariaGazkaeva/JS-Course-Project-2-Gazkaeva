<template>
    <div
        class="cart-item"
    >
        <div class="cart-item__image" >
            <img :src="cartItem.image" :alt="cartItem.name">
        </div>
        <div class="cart-item__info">
            <div class="cart-item__info-name">
                {{ cartItem.name }}
            </div>
            <div>
                <span class="cart-item__title">Цена: </span>{{ cartItem.price }} руб. / шт.
            </div>
            <div>
                <span class="cart-item__title">Количество: </span>{{ cartItem.count }} шт.
            </div>
            <div>
                <span class="cart-item__title">Итого: </span>{{ cartItem.count * cartItem.price }} руб.
            </div>
        </div>
        <div class="cart-item__control-button">
            <button class="cart-button" @click="removeFromCart">УДАЛИТЬ</button>
            <button class="cart-button" @click="increaseCount">+</button>
            <button class="cart-button" @click="decreaseCount">-</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CartItem",
    methods: {
        removeFromCart() {
            this.$emit('removeFromCart');
        },
        increaseCount() {
            this.$emit('increaseCount');
        },
        decreaseCount() {
            this.$emit('decreaseCount');
        },
        openModal() {
            this.$emit('openModal', this.cartItem);
        }
    },
    props: {
        cartItem: {
            type: Object,
            default: () => {},
        }
    }
}
</script>

<style>
.cart-item {
    display: flex;
    justify-content: space-between;
    width: 800px;
    background-color: #ffffff;
    min-height: 200px;
    padding: 12px;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
}

.cart-button {
    width: 100%;
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
    transition: all 0.3s;
}

.cart-button:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.cart-item:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.cart-item__info {
    width: 67%;
    margin-left: 10px;
}

.cart-item__image {
    max-width: 25%;
    align-self: center;
}

.cart-item img {
    max-width: 100%;
    max-height: 97%;
    min-height: 90%;
}

.cart-item__info-name {
    font-size: 25px;
    font-weight: bold;
    margin: 50px;
}

.cart-item__title {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
}
.cart-item__control-button {
    display: flex;
    flex-direction: column;
}
</style>
