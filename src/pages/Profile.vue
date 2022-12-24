<template>
    <div class="profile">

        <div class="navigation">
            <router-link :to="{name: 'catalog', params: {}}">
                <div class="navigation-button">Каталог</div>
            </router-link>
            <router-link :to="{name: 'cart', params: {cart: CART}}">
                <div class="navigation-button">Корзина</div>
            </router-link>
            <router-link :to="{name: 'orders', params: {orders: ORDERS}}">
                <div class="navigation-button">Сделанные заказы</div>
            </router-link>
            <router-link :to="{name: 'profile', params: {profile: USER}}">
                <div class="navigation-button">Личные данные</div>
            </router-link>
        </div>

        <h1>Личные данные</h1>
        <form action="#" class="profile-form">
            <label for="name">ФИО</label>
            <input id="name" type="text" placeholder="Не больше 100 символов" required v-model="user.name">
            <label for="phone">Телефон</label>
            <input id="phone" type="number" placeholder="Начните с 8" required v-model="user.phone">
            <label for="address">Адрес</label>
            <input id="address" type="text" placeholder="Не больше 100 символов" required v-model="user.address">
            <input type="submit" @click="save" value="Сохранить">
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Profile",
    methods: {
        ...mapActions([
            'SET_USER'
        ]),
        save() {
            if (this.user.name.length > 100 || this.user.address.length > 100
                || this.user.phone.length !== 11 || this.user.name.length === 0 || this.user.address.length === 0) {
                alert('Данные введены некорректно')
            } else {
                this.user.saved = true;
                this.SET_USER(this.user);
                alert('Успешно сохранено');
            }
        },
        getStorage() {
            return JSON.parse(window.localStorage.getItem('profile-form'))
        },
        setStorage() {
            localStorage.setItem('profile-form', JSON.stringify(this.user))
        },
        updateStorage() {
            let storage = this.getStorage();
            if (!storage) storage = {};
            storage = JSON.parse(JSON.stringify(this.user));
            this.setStorage(storage);
        }
    },
    watch: {
        user: {
            handler() {
                this.updateStorage()
            },
            deep: true,
        }
    },
    created() {
        let storedForm = this.getStorage();
        this.user = {...this.user, ...storedForm};
    },
    data() {
        return {
            user: {
                saved: false,
                name: '',
                phone: '',
                address: '',
            }
        }
    },
    computed: {
        ...mapGetters([
            'CART',
            'ORDERS'
        ])
    },
}
</script>

<style>
.profile {
    display: flex;
    flex-direction: column;
    margin: 20px;
    background: #f4f4f4;
    padding: 60px;
}
.profile input {
    margin: 10px;
}
.profile button {
    margin: 20px;
}
.navigation {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.navigation-button {
    margin: 20px;
}
.profile-form {
    display: flex;
    flex-direction: column;
}
</style>
