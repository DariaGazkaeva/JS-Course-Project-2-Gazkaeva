<template>
    <div class="modal-mask" @click="onModalMaskClick">
        <div class="modal">
            <div class="modal__close">
                <button class="close-button" @click="closeModal">+</button>
            </div>
            <div class="modal__info">
                <slot></slot>
            </div>
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
        onModalMaskClick(event) {
            if (event.target === event.currentTarget) {
                this.closeModal();
            }
        }
    }
}
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal {
    padding: 15px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    min-width: 68%;
    min-height: 50vh;
    background: white;
    box-shadow: 0 0 10px 0 #2c3e50;
    z-index: 10;
    margin-top: 20px;
    max-height: 100%;
    max-width: 100%;
}

.modal__info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
}

.modal img {
    max-width: 30%;
}

.modal-button {
    width: 10vw;
    min-height: 5vw;
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
    transition-duration: 0.2s;
}

.modal-button:hover {
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    transform: scale(1.04);
}

.close-button {
    float: right;
    width: 5.5vh;
    height: 5.5vh;
    border-radius: 5vh;
    position: relative;
    cursor: pointer;
    font-size: 4vh;
    color: #4d7dab;
    background-color: white;
    padding: 0;
    min-width: 5.5vh;
    rotate: 45deg;
    text-align: center;
    transition-duration: 0.25s;
    border: none;
}

.close-button:hover {
    background-color: #4d7dab;
    border: none;
    color: white;
    box-shadow: none;
}

.modal__inner {
    line-height: 25px;
    max-width: 70%;
    word-wrap: break-word;
}

.modal .product__info-name {
    font-size: 50px;
    margin: 40px;
}

.modal__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
}
</style>
