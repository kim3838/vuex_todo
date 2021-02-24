import Vue from 'vue';
import Vuex from 'vuex'

import {mutations, STORAGE_KEY} from './mutations';
import actions from './actions';
import plugins from "./plugins";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins,
    state : {
        todos : JSON.parse(window.localStorage.getItem(STORAGE_KEY)
            || '[{ "label": "Something Must\'ve done", "done": false}]')
    },
    mutations,
    actions,
});
