import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

// const localStorage = new VuexPersistence({
//     reducer: (state) => ({user: state.user})
// })

let store = new Vuex.Store({
    mutations: {
        SET_CART: (state, product) => {
            for (let item of state.cart) {
                if (item['product']['id'] === product['id']) {
                    item.count++;
                    return;
                }
            }
            let item = {};
            item['product'] = product;
            item['count'] = 1;
            state.cart.push(item);
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1);
        },
        REMOVE_FROM_CART_BY_PRODUCT: (state, product) => {
            let index = -1;
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i]['product']['id'] === product['id']) {
                    index = i;
                    break;
                }
            }
            state.cart.splice(index, 1);
        },
        INCREASE_COUNT: (state, index) => {
            state.cart[index].count++;
        },
        DECREASE_COUNT: (state, index) => {
            if (state.cart[index].count > 1) {
                state.cart[index].count--;
            }
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        CLEAR_ORDERS: (state) => {
            state.orders = [];
        },
        CLEAR_CART: (state) => {
            state.cart = [];
        },
        ADD_ORDERS: (state, cart) => {
            if (cart.length === 0) {
                return;
            }
            const date = new Date();
            const newOrder = {};
            newOrder['date'] = date;
            newOrder['cart'] = structuredClone(cart);
            state.orders.push(newOrder);
        },
        ADD_EXISTING_ORDER: (state, order) => {
            state.orders.push(order);
        }
    },
    actions: {
        ADD_ALL_ORDERS: ({commit}, orders) => {
            orders.forEach((order) => {
                commit('ADD_EXISTING_ORDER', order);
            })
        },
        ADD_TO_CART({commit}, product) {
            commit('SET_CART', product);
        },
        REMOVE_FROM_CART({commit}, index) {
            commit('REMOVE_FROM_CART', index);
        },
        REMOVE_FROM_CART_BY_PRODUCT({commit}, product) {
            commit('REMOVE_FROM_CART_BY_PRODUCT', product);
        },
        INCREASE_COUNT({commit}, index) {
            commit('INCREASE_COUNT', index);
        },
        DECREASE_COUNT({commit}, index) {
            commit('DECREASE_COUNT', index);
        },
        SET_USER({commit}, user) {
            commit('SET_USER', user);
        },
        CLEAR_ORDERS({commit}) {
            commit('CLEAR_ORDERS');
        },
        CLEAR_CART({commit}) {
            commit('CLEAR_CART');
        },
        ADD_ORDERS({commit}, orders) {
            commit('ADD_ORDERS', orders);
        }
    },
    getters: {
        CART(state) {
            return state.cart;
        },
        USER(state) {
            return state.user;
        },
        ORDERS(state) {
            return state.orders;
        },
        PRODUCTS(state) {
            return state.products;
        }
    },
    state: {
        cart: [],
        user: Object,
        orders: [],
        products: [
            {
                id: 0,
                name: 'Дженга',
                image: 'https://irecommend.ru/sites/default/files/product-images/10297/8PVhXqeOEbR6SvyGwu9A.jpg',
                price: 700,
                players: '2-4',
                info: 'Вы готовы противостоять закону гравитации? Тогда увлекательная настольная игра “Дженга” подарит вам море положительных эмоций и позволит потренировать ловкость рук и точность движений. Правила игры очень просты. Из ровных деревянных брусков строится башня, а затем игроки начинают аккуратно вытаскивать по одному бруску и ставить его наверх башни.',
            },
            {
                id: 1,
                name: 'Мафия',
                image: 'https://cdn1.ozone.ru/s3/multimedia-8/6073814192.jpg',
                price: 300,
                players: 'от 6 человек',
                info: 'Это культовая игра, но в новой — усовершенствованной версии. Что нужно для идеальной «Мафии»? Интересные роли, атмосферные карточки и подсказки для новичков. К классической настолке мы добавили 3 новые роли, чтобы каждая партия была неповторимой. И сделали удобный блокнот для ведущего и карты-подсказки, чтобы даже новички сразу стали гуру «Мафии».',
            },
            {
                id: 2,
                name: 'Имаджинариум',
                image: 'https://cosmodrome.games/upload/resize_cache/iblock/961/500_400_1/961695f60221d67f976f8b7a80b5b105.jpg',
                price: 2000,
                players: '2-6',
                info: '«Имаджинариум» уникальная игра, где игроки пытаются понять ассоциации, эмоции и образы других игроков и донести свои фантазии и воображение.  Игра увлекает своей простотой – подбирайте ассоциации к картам, пытайтесь угадать чужие образы, развивайте воображение и веселитесь компанией!',
            },
            {
                id: 3,
                name: 'Свинтус',
                image: 'https://4fishki.ru/images/stories/virtuemart/product/_______________516879e8c85e3.jpg',
                price: 500,
                players: '2-6',
                info: 'Карточная игра "Свинтус" - простая, веселая и быстрая карточная игра! Цель игры предельно проста - избавиться от всех своих карт первым.',
            },
            {
                id: 4,
                name: 'Эволюция',
                image: 'https://cdn1.ozone.ru/multimedia/wc1000/1018901705.jpg',
                price: 1390,
                players: '2-4',
                info: ' В игре "Эволюция" Вам предлагается самим комбинировать различные свойства (приспособления) животных и развить собственную популяцию в условиях постоянно меняющегося количества ресурсов - еды. Регулируя численность животных, получая новые полезные свойства и противодействуя соперникам, популяция игрока должна выжить и к концу игры занять доминирующее положение в экосистеме.',
            },
        ],
    },
//    plugins: [localStorage.plugin]
});

export default store;
