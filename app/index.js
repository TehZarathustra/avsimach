import 'normalize.css';
import Vue from 'vue';
import router from './routes';
import {store} from './store';
import Vuetify from 'vuetify';
import 'font-awesome/css/font-awesome.css';
import Firebase from 'firebase';
import VueFire from 'vuefire';
import '../node_modules/vuetify/dist/vuetify.min.css';

// components
import Drawer from './components/drawer/drawer.vue';
import Toolbar from './components/toolbar/toolbar.vue';
import Alert from './components/alert/alert.vue';

Vue.use(Vuetify);
Vue.use(VueFire);

new Vue({
	el: '#app',
	router,
	store,
	components: {
		'main-drawer': Drawer,
		'main-toolbar': Toolbar,
		'alert-component': Alert
	},
	created () {
		Firebase.initializeApp({
			apiKey: "AIzaSyCtRWInttCqiz7d_b2nxRXYaTnPG4Sjw50",
			authDomain: "avsimach.firebaseapp.com",
			databaseURL: "https://avsimach.firebaseio.com",
			projectId: "avsimach",
			storageBucket: "avsimach.appspot.com",
			messagingSenderId: "442287453798"
		});

		Firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.$store.dispatch('autoSignIn', user);
			}
		});
	}
});
