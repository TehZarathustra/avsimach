<template>
	<div class="mission" v-if="fullyLoaded">

		<div class="mission-wrapper" v-if="user">
			<h1>Миссия {{mission.order}}, {{mission.name}}</h1>
			<div class="mission__general-wrapper">
				<!-- weather -->
				<div class="mission__general-item" v-if="weather">
					<h2>Условия и погода</h2>
					<ul>
						<li>{{weather.general}}, {{weather.time}}, {{weather.clouds}}</li>
						<li>{{weather.wind}}</li>
					</ul>
				</div>

				<!-- airfields -->
				<div class="mission__general-item" v-if="airfields">
					<h2>Аэродромы</h2>
					<ul>
						<li>Основной: {{airfields.main}}</li>
						<li>Запасной: {{airfields.sub}}</li>
					</ul>
				</div>
				<!-- threats -->
				<div class="mission__general-item" v-if="threats">
					<h2>Вероятные угрозы</h2>
					<div class="mission__general-threats">
						<asset
							v-for="threat,index in threats"
							:key="index"
							:asset="{name: threat.name}">
						</asset>
					</div>
				</div>
			</div>

			{{flights}}
			<!-- flights -->
			<div class="mission__flights">
				<flight v-for="(flight, index) in flights"
					:data="flight"
					:order="index"
					:key="index"></flight>
			</div>
		</div>

		<div v-else>
			<h1>Для просмотра задания, надо залогиниться</h1>
		</div>
	</div>

	<div class="mission__loader" v-else>
			<v-progress-circular indeterminate v-bind:size="100" color="primary"></v-progress-circular>
	</div>
</template>

<script>
import Firebase from 'firebase';
import flight from '../flight-card/flight-card.vue';
import asset from '../asset/asset.vue';

export default {
	firebase ()  {
		return {
			missionRaw: {
				source: Firebase.database().ref('missions')
					.orderByChild('campaign_mission')
					.equalTo(this.missionPath),
				readyCallback: function () {
					this.missionLoaded = true;
				}
			},
			flightsRaw: {
				source: Firebase.database().ref('flights'),
				readyCallback: function () {
					this.flightsLoaded = true;
				}
			}
		}
	},
	data () {
		return {
			missionKey: null,
			missionLoaded: false,
			flightsLoaded: false
		}
	},
	computed: {
		missionPath () {
			return this.$route.params
				&& `${this.$route.params.campaign}:${this.$route.params.mission}`;
		},
		user () {
			return this.$store.getters.user;
		},
		userTeam () {
			return this.user && this.user.team;
		},
		mission () {
			if (this.missionRaw && this.missionRaw.length) {
				const mission = this.missionRaw[0];

				this.missionKey = mission['.key'];

				return mission;
			}

			return false;
		},
		fullyLoaded () {
			return this.mission && this.flightsLoaded;
		},
		task () {
			return this.mission && this.mission[
				this.userTeam === 'red'
					? 'redTask'
					: 'blueTask'
			];
		},
		flights () {
			return this.missionKey
				&& this.flightsRaw.filter(item => {
					return item.mission_team === `${this.missionKey}:${this.userTeam}`;
				});
		},
		weather () {
			return this.task && this.task.weather;
		},
		airfields () {
			return this.task && this.task.airfields;
		},
		threats () {
			return this.task && this.task.threats;
		}
	},
	components: {
		flight,
		asset
	}
}
</script>

<style scoped lang="sass">
.mission
	max-width: 1000px
	width: 100%
	margin: 0 auto
	&__flights
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		> div
			margin-bottom: 20px
	&__general-wrapper
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		margin: 10px 5px
	&__general-item
		li
			list-style: none
	&__loader
		width: 100%
		display: flex
		justify-content: center
</style>
