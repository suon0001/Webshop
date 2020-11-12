import Vue from 'vue'
import Vuex from 'vuex'
import { dbMenuAdd } from '../firebase'

/*eslint-disable*/
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        basketItems: [],
        menuItems: [],
        currentUser: null
    },
    mutations: {
        addBasketItems: (state, basketItems) => {
            if (basketItems instanceof Array) {
                basketItems.forEach(item => {
                    if (state.basketItems.find((itemInArray) => item.name === itemInArray.name)) {
                        item = state.basketItems.find(
                            (itemInArray) => item.name === itemInArray.name

                        );
                        item.quantity++
                    } else {
                        state.basketItems.push({
                            name: item.name,
                            selected: item.selected,
                            price: item.price,
                            quantity: 1,
                        });
                    }
                })
            }
        },
        userStatus(state, user) {
            if (user) {
                state.currentUser = user
            } else {
                state.currentUser = null
            }
        },

        setMenuItems: state => {
            let menuItems = []

            dbMenuAdd.onSnapshot((snapshotItems) => {
                menuItems = []
                snapshotItems.forEach((doc) => {
                    var menuItemData = doc.data();
                    menuItems.push({
                        ...menuItemData,
                        id: doc.id
                    })
                })
                state.menuItems = menuItems
            }, )
        },
    },
    actions: {
        setUser(context, user) {
            context.commit('userStatus', user)
        },
        setMenuItems: context => {
            context.commit('setMenuItems')
        },

    },
    getters: {
        getBasketItems: state => state.basketItems,
        currentUser: state => state.currentUser,
        getMenuItems: state => state.menuItems,
    }
})