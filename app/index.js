import 'normalize.css';
import Vue from 'vue';
import router from './routes';
import {store} from './store';
import Vuetify from 'vuetify';
import 'font-awesome/css/font-awesome.css';
import VueFire from 'vuefire';
import '../node_modules/vuetify/dist/vuetify.min.css';

// components
import Drawer from './components/drawer/drawer.vue';
import Toolbar from './components/toolbar/toolbar.vue';

Vue.use(Vuetify);
Vue.use(VueFire);

new Vue({
	el: '#app',
	router,
	store,
	components: {
		'main-drawer': Drawer,
		'main-toolbar': Toolbar
	}
});
