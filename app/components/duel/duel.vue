<template>
	<div class="duel">
		<div class="duel__players">
			<h1>В раздевалке</h1>
			<players></players>
		</div>
	</div>
</template>

<script>
import Firebase from 'firebase';
import Axios from 'axios';
import Players from './__players/players.vue';

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
			Axios.get('https://avsimach-bot.herokuapp.com/testkek', {
				headers: {
					'Access-Control-Allow-Origin': '*',
				}
			}).then(function (response) {

				})
				.catch(function (error) {
					this.$store.commit('setAlert', {type: 'error', message: 'Начальник устал, напиши одмену'});
				});
		}
	},
	components: {
		'players': Players
	}
}
</script>

<style scoped lang="sass">
.duel
	max-width: 850px
	width: 100%
	margin: 0 auto
</style>
