import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		drawer: false
	},
	getters: {
		drawer (state) {
			return state.drawer;
		}
	},
	mutations: {
		setDrawer (state, payload) {
			state.drawer = payload;
		}
	},
	actions: {
		toggleDrawer ({commit}, payload) {
			if (!payload) {
				commit('setDrawer', this.state.drawer ? false : true);
				return;
			}

			commit('setDrawer', payload);
		}
	}
});

