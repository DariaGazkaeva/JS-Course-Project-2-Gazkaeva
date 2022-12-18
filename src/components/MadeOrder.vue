<template>
    <div
        class="order"
        @click="openModal"
    >
        <div class="order__image">
            <img :src="order.image" :alt="order.name">
        </div>
        <div class="order__info">
            <div class="order__info-name">
                {{ order.name }}
            </div>
            <div>
                <span class="order__title">
                    Цена:
                </span>
                {{ order.price }}
            </div>
            <div>
                <span class="order__title">
                    Количество:
                </span>
                {{ order.count }}
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
.order-button:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.order:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.order__info {
    width: 67%;
    margin-left: 10px;
}

.order img {
    max-width: 100%;
    max-height: 97%;
    min-height: 90%;
}

.order__info-name {
    font-size: 25px;
    font-weight: bold;
    margin: 50px;
}

.order__title {
    font-size: 16px;
    font-weight: bold;
}
</style>
