<template>
	<div class="main-page">
		<mission-preview v-if="loaded" :mission="missionData"></mission-preview>
		<div class="main-page__loader" v-else>
			<v-progress-circular indeterminate v-bind:size="100" color="primary"></v-progress-circular>
		</div>
		<div class="main-page__results" v-if="loaded">
			<h1>Результаты прошлого вылета</h1>
			<results></results>
		</div>
	</div>
</template>

<script>
import MissionPreview from '../mission-preview/mission-preview.vue';
import Results from '../results/results.vue';
import Firebase from 'firebase';

export default {
	firebase ()  {
		return {
			missions: {
				source: Firebase.database().ref('missions'),
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
		missionData () {
			return this.missions.find(mission => mission.active);
		}
	},
	components: {
		'mission-preview': MissionPreview,
		results: Results
	}
}
</script>

<style scoped lang="sass">
.main-page
	width: 100%
	&__loader
		width: 100%
		display: flex
		justify-content: center
	&__results
		padding-top: 30px
		max-width: 1100px
		margin: 0 auto
</style>
