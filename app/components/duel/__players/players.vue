<template>
	<div class="players">
		<div class="players__wrapper" v-if="loaded">

			<div class="player" v-for="player in players">
				<div class="player__avatar" :style="{backgroundImage: `url(${player.avatar})`}"></div>
				<v-btn @click="challenge()" block>Вызвать {{player.name}}</v-btn>
			</div>

		</div>
		<div class="players__loading" v-else>
			<v-progress-circular indeterminate v-bind:size="50" color="primary">
			</v-progress-circular>
		</div>
	</div>
</template>

<script>
import Firebase from 'firebase';
import Axios from 'axios';

export default {
	firebase ()  {
		return {
			users: {
				source: Firebase.database().ref('users'),
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
	computed: {
		players () {
			return this.loaded && this.users.filter(user => {
				return user.name !== this.$store.getters.user.name;
			});
		}
	},
	methods: {
		challenge() {
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
	}
}
</script>

<style scoped lang="sass">
.players
	max-width: 445px
	border: 1px solid lightgray
	box-sizing: border-box
	padding: 10px 0
	&__wrapper
		display: flex
		flex-wrap: wrap
		justify-content: space-around
	&__loading
		width: 100%
		display: flex
		justify-content: center

.player
	width: 200px
	margin-bottom: 10px
	&__avatar
		height: 150px
		overflow: hidden
		display: flex
		align-items: center
		background-size: cover
	img
		width: 100%
	&:last-child
		margin-bottom: 0
</style>
