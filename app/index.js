import 'normalize.css';
import Vue from 'vue';
import router from './routes';
import {store} from './store';

new Vue({
	el: '#app',
	router,
	store
});
