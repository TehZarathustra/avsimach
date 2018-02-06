import {store} from './store';

const RETRY_TIMEOUT = 200;

export default (to, from, next) => {
	let user = store.getters.user;
	let reconnectRetries = 5;

	if (user && user.id) {
		next();
	}

	let interval = setInterval(() => {
		user = store.getters.user;

		if (user && user.id) {
			clearInterval(interval);
			next();
		}

		if (reconnectRetries < 1 && !user) {
			clearInterval(interval);
			// next('/sign-in');
		}

		reconnectRetries--;
	}, RETRY_TIMEOUT);
}
