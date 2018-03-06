<template>
	<div class="results" v-if="activeTake">
		<div class="results__description">{{activeTake.description}}</div>

		<div class="results__sides">
			<!-- red-col -->
			<div class="results__side results_side-red" v-if="activeTake.redFlights">
				<div class="results__heading">Красные</div>
				<div class="results__flight" v-for="flight in activeTake.redFlights">
					<h3>{{flight.flight}}</h3>
					<p>{{flight.description}}</p>
				</div>
				<div class="results__score">
					<score :players="activeTake.redPlayers"></score>
				</div>
			</div>
			<!-- /red-col end -->

			<!-- blue-col -->
			<div class="results__side results_side-red">
				<div class="results__heading">Синие</div>
				<div class="results__flight" v-for="flight in activeTake.blueFlights">
					<h3>{{flight.flight}}</h3>
					<p>{{flight.description}}</p>
				</div>
				<div class="results__score">
					<score :players="activeTake.bluePlayers"></score>
				</div>
			</div>
			<!-- /blue-col end -->
		</div>
	</div>

	<div class="results__loading" v-else>
		<v-progress-circular indeterminate v-bind:size="100" color="primary">
		</v-progress-circular>
	</div>
</template>

<script>
import Score from '../score/score.vue';
import Firebase from 'firebase';

export default {
	firebase () {
		return {
			takes: {
				source: Firebase.database().ref('takes'),
				readyCallback: function () {
					this.takesLoaded = true;
				}
			}
		}
	},
	data () {
		return {
			takesLoaded: false
		}
	},
	components: {
		score: Score
	},
	computed: {
		activeTake () {
			return this.takes && this.takes.find(take => take.active);
		}
	}
}
</script>

<style scoped lang="sass">
.results
	max-width: 1100px
	margin: 0 auto
	background: #ECECEC
	padding: 30px 60px
	box-sizing: border-box
	&__description
		font-size: 24px
	&__sides
		display: flex
		justify-content: space-between
	&__side
		max-width: 400px
	&__heading
		font-size: 34px
		margin-top: 20px
		margin-bottom: 10px
	&__flight
		h3
			font-size: 22px
		p
			font-size: 16px
	&__loading
		width: 100%
		display: flex
		justify-content: center
</style>
