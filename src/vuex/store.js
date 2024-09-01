import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cart: [],
        user: Object,
        orders: []
    },
    mutations: {
        SET_CART: (state, product) => {
            let addProduct = state.cart.length === 0;
            if (!addProduct) {
                for (let i = 0; i < state.cart.length; i++) {
                    if (state.cart[i].id === product.id) {
                        state.cart[i].count++;
                        return;
                    } else {
                        addProduct = true;
                    }
                }
            }
            if (addProduct) {
                Vue.set(product, 'count', 1);
                state.cart.push(product);
            }
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1);
        },
        REMOVE_ALL_FROM_CART: (state) => {
            state.cart = [];
        },
        REMOVE_FROM_CART_BY_PRODUCT: (state, product) => {
            let index = state.cart.indexOf(product);
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
        ADD_ORDERS: (state, orders) => {
            orders.forEach(order => {
                let index = state.orders.findIndex(element => {
                    return element.id === order.id;
                });
                if (index === -1) {
                    state.orders.push(order)
                } else {
                    state.orders[index].count += order.count;
                }
            });
        }
    },
    actions: {
        ADD_TO_CART({commit}, product) {
            commit('SET_CART', product);
        },
        REMOVE_FROM_CART({commit}, index) {
            commit('REMOVE_FROM_CART', index);
        },
        REMOVE_ALL_FROM_CART({commit}) {
            commit('REMOVE_ALL_FROM_CART');
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
    },
    plugins: [new VuexPersistence().plugin]
});

export default store;
