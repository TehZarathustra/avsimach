<template>
	<div class="duel">
		<h1>Duel</h1>
		<v-btn @click="sendKek()" block>kek</v-btn>
	</div>
</template>

<script>
import Firebase from 'firebase';
import Axios from 'axios';

export default {
	firebase ()  {
		return {
			assets: {
				source: Firebase.database().ref('assets'),
				readyCallback: function () {
					this.loaded = true;
				}
			}
		}
	},
	data () {
		return {
			loaded: false
		}
	},
	methods: {
		sendKek() {
			Axios.get('/testkek')
				.then(function (response) {
					console.log('response >>>', response);
				})
				.catch(function (error) {
					console.log('error >>>', error);
				});
		}
	}
}
</script>
