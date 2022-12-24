<template>
    <div
        class="order"
        @click="openModal"
    >
        <div class="order__date">
            Дата: {{ new Date(order.date).toLocaleDateString("ru-RU") }}
        </div>
        <div class="order__info"
             v-for="cartItem in order.cart"
             :key="cartItem.id"
        >
            <img :src="cartItem.product.image" :alt="cartItem.product.name">
            <div class="order__info-name">
                {{ cartItem.product.name }}
            </div>
            <div class="order__title">
                Количество: {{ cartItem.count }}
            </div>
            <div class="order__title">
                Стоимость: {{ cartItem.product.price * cartItem.count}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MadeOrder",
    props: {
        order: {
            type: Object,
            default: () => {},
        }
    },
    methods: {
        openModal() {
            this.$emit('openModal', this.order);
        }
    }
}
</script>

<style>
.order {
    display: flex;
    flex-direction: column;
    width: 900px;
    background-color: #ffffff;
    padding: 12px;
    margin-right: 20px;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
}

.order:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.order__info {
    display: flex;
    width: 67%;
    margin-left: 10px;
    flex-direction: row;
}

.order img {
    width: 150px;
    margin-left: 10px;
    margin-bottom: 10px;
}

.order__info-name {
    min-width: 150px;
    font-size: 20px;
    font-weight: bold;
    margin: 50px;
}

.order__title {
    font-size: 15px;
    font-weight: bold;
    margin: 50px;
}
.order__date {
    font-size: 15px;
    font-weight: bold;
    margin: auto;
}
</style>
