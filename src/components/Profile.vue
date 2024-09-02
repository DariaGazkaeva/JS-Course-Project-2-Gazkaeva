<template>
    <div class="profile">
        <Notification :text="notificationText" v-if="notificationIsShow"/>
        <Navigation/>
        <h1>Личные данные</h1>
        <form action="#">
            <label>
                ФИО
                <input type="text" placeholder="Введите ФИО" required v-model="user.name">
            </label>
            <label>
                Номер телефона
                <input type="tel" placeholder="Введите номер телефона" required v-model="user.phone">
            </label>
            <label>
                Адрес
                <input type="text" placeholder="Введите адрес" required v-model="user.address">
            </label>

            <input type="submit" @click.prevent="save" value="Сохранить">
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Navigation from "@/components/Navigation";
import Notification from "@/components/Notification";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Profile",
    components: {Navigation, Notification},
    methods: {
        ...mapActions([
            'SET_USER'
        ]),
        save() {

            this.user.saved = true;
            this.SET_USER(this.user);
            this.workOutNotification('Успешно сохранено');
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
        },
        workOutNotification(text) {
            this.notificationText = text;
            this.notificationIsShow = true;
            this.hideNotification();
        },
        hideNotification() {
            setTimeout(() => {
                this.notificationIsShow = false
            }, 3000);
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
                phone: 8,
                address: '',
            },
            notificationText: '',
            notificationIsShow: false
        }
    },
    computed: {
        ...mapGetters([
            'USER',
            'CART',
            'ORDERS',
        ])
    },
}
</script>

<style>
.profile {
    background: #f4f4f4;
    padding: 60px;
    min-width: 85vw;
    min-height: 79vh;
}
.profile form {
    width: 40%;
    margin-right: auto;
    margin-left: auto;
}
.profile input[type=text], .profile input[type=tel] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    margin: 10px;
    box-sizing: border-box;
}

.profile input[type=submit] {
    align-self: center;
    width: 40%;
    min-height: 25%;
    margin: 10px;
    padding: 8px;
    display: inline-block;
    background-color: #4d7dab;
    border: none;
    color: white;
    border-radius: 2px;
    font-weight: bold;
    font-family: FreeMono, monospace;
    font-size: 18px;
    transition: all 0.1s;
}

.profile input[type=submit]:hover {
    background-color: #00c022;
}
</style>
