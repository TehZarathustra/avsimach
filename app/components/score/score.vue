<template>
	<div class="score" v-if="usersLoaded && players">
		<div class="score__headings">
			<div class="score__tanks"><img :src="plane" alt="land"></div>
			<div class="score__planes"><img :src="tank" alt="air"></div>
			<div class="score__naval"><img :src="naval" alt="naval"></div>
			<div class="score__deaths"><img :src="death" alt="deaths"></div>
		</div>
		<div class="score__players">
			<div class="score__player-row" v-for="player in playersData">
				<div class="score__player">
					<mini-profile :player="player" type="text"></mini-profile>
				</div>
				<div class="score__player-planes">{{player.airKills}}</div>
				<div class="score__player-tanks">{{player.groundKills}}</div>
				<div class="score__player-naval">{{player.navalKills}}</div>
				<div class="score__player-deaths">{{player.deaths}}</div>
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
			},
			kills: {
				source: Firebase.database().ref('kills'),
				readyCallback: function () {
					this.killsLoaded = true;
				}
			},
			deaths: {
				source: Firebase.database().ref('deaths'),
				readyCallback: function () {
					this.deathsLoaded = true;
				}
			}
		}
	},
	data () {
		return {
			tank: tankImage,
			plane: planeImage,
			naval: navalImage,
			death: deathImage,
			usersLoaded: false,
			killsLoaded: false,
			deathsLoaded: false
		}
	},
	props: ['players', 'path'],
	computed: {
		playersData () {
			if (!this.usersLoaded
					|| !this.players
					|| !this.kills) {
				return null;
			}

			const players = this.players.map(playerRaw => {
				const playerName = playerRaw.name;
				const playerKills = this.kills.filter(kill => kill.name === playerName
					&& kill.campaign_mission_take === this.path);
				const playerDeaths = this.deaths.filter(kill => kill.name === playerName
					&& kill.campaign_mission_take === this.path);

				let player = this.users.find(user => user.name === playerName);

				player.asset = playerRaw.asset;
				player.airKills = playerKills.filter(kill => kill.type === 'air').length;
				player.groundKills = playerKills.filter(kill => kill.type === 'land').length;
				player.navalKills = playerKills.filter(kill => kill.type === 'naval').length;
				player.deaths = playerDeaths.length;

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
