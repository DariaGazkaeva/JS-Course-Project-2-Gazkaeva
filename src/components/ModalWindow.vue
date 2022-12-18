<template>
    <div class="modal">
        <div class="modal__header">
            <button class="modal-button" @click="closeModal">Закрыть</button>
        </div>
        <div class="modal__info">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalWindow",
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        addToCart() {
            this.$emit('addToCart');
        },
        removeFromCart() {
            this.$emit('removeFromCart');
        },
    }
}
</script>

<style>
.modal {
    padding: 15px;
    position: absolute;
    width: 68%;
    height: 800px;
    margin: auto;
    background: white;
    box-shadow: 0 0 10px 0 #2c3e50;
    z-index: 10;
}
.modal img {
    display: flex;
    max-width: 40%;
    max-height: 70%;
}
.modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal__info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 15px;
}
.modal-button {
    width: 100px;
    height: 50px;
    border-radius: 10px;
    border-color: #aeaeae;
    margin: auto;
    padding: 8px;
    background-color: #f4f4f4;
}
.modal-button:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}
</style>
