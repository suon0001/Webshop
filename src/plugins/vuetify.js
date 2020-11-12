import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: '#333333',
                secondary: '#2B2B2B',
                white: '#FFFFFF',
                navy: '#000080',
                darkgrey: '#707070',
                complete: '#707070',
                incomplete: '#FF1212',
                lightgrey: '#cacaca',
            }
        }
    }
});