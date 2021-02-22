require('./bootstrap');

import Vue from 'vue';
import Vuex, {mapState, mapGetters, mapMutations, mapActions} from "vuex";
import store from './store';
import App from "./components/todo/App";

window.VuexMap = {
    State : mapState,
    Getters : mapGetters,
    Mutations : mapMutations,
    Actions : mapActions
};

new Vue({
    el : '#app',
    store,
    render: h => h(App)
});