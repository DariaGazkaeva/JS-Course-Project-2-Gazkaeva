<template>
    <div class="notification">
        <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Notification",
    props: ['text'],
}
</script>

<style>
.notification {
    width: 10%;
    border-radius: 5px;
    word-wrap: break-word;
    padding: 10px;
    background-color: #d6d3d4;
    box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
    opacity: 0;
    animation: ani 3s forwards;
}
@keyframes ani {
    0% {opacity: 0}
    10% {opacity: 1; background-color: #d66d77; color: white}
    60% {opacity: 1; background-color: #d66d77; color: white}
    100% {opacity: 0}
}
</style>
