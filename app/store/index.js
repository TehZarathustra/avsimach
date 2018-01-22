import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: 'Rex'
	},
	getters: {
		user (state) {
			return state.user;
		}
	}
});

