<template>
	<div class="score" v-if="usersLoaded">
		<div class="score__headings">
			<div class="score__tanks"><img :src="tank" alt="land"></div>
			<div class="score__planes"><img :src="plane" alt="air"></div>
			<div class="score__naval"><img :src="naval" alt="naval"></div>
			<div class="score__deaths"><img :src="death" alt="deaths"></div>
		</div>
		<div class="score__players">
			<div class="score__player-row" v-for="player in players">
				<div class="score__player">
					<mini-profile :player="player" type="text"></mini-profile>
				</div>
				<div class="score__player-tanks">1</div>
				<div class="score__player-planes">3</div>
				<div class="score__player-naval">0</div>
				<div class="score__player-deaths">4</div>
			</div>
		</div>
	</div>
	<div class="score__loading" v-else>
		<v-progress-circular indeterminate v-bind:size="50" color="primary">
		</v-progress-circular>
	</div>
</template>

<script>
import tankImage from './tank.png';
import planeImage from './plane.png';
import navalImage from './boat.png';
import deathImage from './death.png';
import Firebase from 'firebase';
import miniProfile from '../mini-profile/mini-profile.vue';

export default {
	firebase () {
		return {
			users: {
				source: Firebase.database().ref('users'),
				readyCallback: function () {
					this.usersLoaded = true;
				}
			}
		}
	},
	data () {
		return {
			playersRaw: [{name: 'Zarathustra', asset: 'MiG-21'}],
			tank: tankImage,
			plane: planeImage,
			naval: navalImage,
			death: deathImage,
			usersLoaded: false
		}
	},
	computed: {
		players () {
			if (!this.usersLoaded) {
				return null;
			}

			const players = this.playersRaw.map(playerRaw => {
				let player = this.users.find(user => user.name === playerRaw.name);
				player.asset = playerRaw.asset;

				return player;
			});

			return players;
		}
	},
	components: {
		'mini-profile': miniProfile
	}
}
</script>

<style scoped lang="sass">
.score
	width: 390px
	&__headings
		display: flex
		align-items: center
		text-align: center
		margin-bottom: 10px
		padding-left: calc(100% - (60px * 4))
	&__tanks, &__planes, &__naval, &__deaths
		width: 60px
		height: 40px
		display: flex
		justify-content: center
		align-items: center
	&__avatar
		margin-right: 10px
	&__tanks img
			width: 28px
	&__planes img
			width: 19px
	&__naval img
			width: 20px
	&__deaths img
			width: 22px
	&__player-row
		display: flex
		align-items: center
		margin-bottom: 10px
	&__player
		width: calc(100% - (60px * 4))
		font-size: 16px
	&__player-tanks, &__player-planes, &__player-naval, &__player-deaths
		width: 60px
		font-size: 16px
		text-align: center
	&__loading
		width: 100%
		display: flex
		justify-content: center
</style>
