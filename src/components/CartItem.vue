<template>
    <div class="cart-item">
        <div class="cart-item__image">
            <img :src="cartItem.image">
        </div>
        <div class="cart-item__info">
            <div class="cart-item__info-name">
                {{ cartItem.name }}
            </div>
            <div>
                <span class="cart-item__title">
                    Цена:
                </span>
                {{ cartItem.price }}
            </div>
            <div class="cart-item__title">
                Количество: {{ cartItem.count }}
            </div>
        </div>
        <div class="cart-item__control-button">
            <button class="cart-button" @click="removeFromCart">Delete</button>
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
        }
    },
    props: {
        cartItem: {
            type: Object,
            default: () => {},
        }
    },
    mounted() {
        this.$set(this.cartItem, 'count', 1);
    }
}
</script>

<style>
.cart-item {
    display: flex;
    justify-content: space-between;
    width: 800px;
    background-color: #ffffff;
    height: 200px;
    padding: 12px;
    margin-right: 20px;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
}

.cart-button {
    width: 100%;
    height: 20%;
    border-radius: 10px;
    border-color: #aeaeae;
    margin: auto;
    padding: 8px;
    display: inline-block;
    background-color: #f4f4f4;
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
}
.cart-item__control-button {
    display: flex;
    flex-direction: column;
}
</style>
