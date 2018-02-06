import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		drawer: false,
		user: null,
		alert: null
	},
	getters: {
		drawer (state) {
			return state.drawer;
		},
		alert (state) {
			return state.alert;
		},
		user (state) {
			return state.user;
		}
	},
	mutations: {
		setDrawer (state, payload) {
			state.drawer = payload;
		},
		setUser (state, payload) {
			state.user = payload;
		},
		setAlert (state, payload) {
			state.alert = payload;
		}
	},
	actions: {
		autoSignIn ({commit}, payload) {
			commit('setUser', {id: payload.uid});
		},
		signUserIn ({commit}, payload) {
			return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					const newUser = {
						id: user.uid
					}

					commit('setUser', newUser);
				})
				.catch(error => {
					commit('setAlert', {type: 'error', message: error.message});

					console.log(error);

					return 'error';
				});
		},
		signOut ({commit}) {
		 	firebase.auth().signOut();
		 	commit('setUser', null);
		},
		triggerError ({commit}, payload) {
			commit('setError', payload);
		},
		toggleDrawer ({commit}, payload) {
			if (!payload) {
				commit('setDrawer', this.state.drawer ? false : true);
				return;
			}

			commit('setDrawer', payload);
		}
	}
});

