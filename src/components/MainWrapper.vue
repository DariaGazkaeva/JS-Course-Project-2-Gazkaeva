<template>
    <div class="main-wrapper">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>

export default {
    name: "MainWrapper",
    components: {},
    data() {
        return {}
    },
    methods: {},
    watch: {},
}
</script>

<style>
.main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
}
</style>
