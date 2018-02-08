<template>
	<div class="card" v-bind:class="typeClasses">
		<div class="card__task-wrapper">
		<div class="card__task">
			<b>Задача {{type === 'red' ? 'Красных' : 'Синих'}}:</b>
			<br/>{{missionTask}}
		</div>
		<div class="card__start">{{start}}</div>
		<div class="card__assets">
			<div class="card__asset" v-for="asset in task.assets">
				<asset :asset='asset'></asset>
			</div>
		</div>
		</div>
		<div class="card__button">
			<v-btn :disabled="user && (user.team && user.team !== type)"
				@click="assign()" block>{{buttonLabel}}</v-btn>
		</div>
		<v-dialog v-model="dialog" max-width="380">
      <v-card>
        <v-card-title class="headline card__headline">За {{type === 'red' ? 'Красных' : 'Синих'}}?</v-card-title>
        <div class="card__image" v-if="type === 'red'">
        	<img :src="redLogo" alt="">
        </div>
        <div class="card__image" v-else>
        	<img :src="blueLogo" alt="">
        </div>
        <v-card-text>Вступая, ты будешь играть за {{type === 'red' ? 'Красных' : 'Синих'}} до окончания кампании</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="type" flat="flat" @click.native="dialog = false">Подумать</v-btn>
          <v-btn :color="type" :loading="loadingAssign" flat="flat" @click.native="assignTeam()">Вступить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
	</div>
</template>

<script>
import Asset from '../../asset/asset.vue';
import Firebase from 'firebase';
import blueLogo from '../../../blue_original.png';
import redLogo from '../../../red_star.png';

export default {
	data () {
		return {
			dialog: false,
			missionTask: this.task.task,
			start: this.task.startCondition,
			buttonLabel: this.task.button,
			blueLogo: blueLogo,
			redLogo: redLogo,
			loadingAssign: false,
			typeClasses: {
				card_red: this.type === 'red',
				card_blue: this.type === 'blue'
			}
		}
	},
	methods: {
		assign () {
			if (this.user && this.user.team === this.type) {
				this.$router.push({path: '/campaigns/turkish_frontier/1'});
			} else if (!this.isUserAuthenticated) {
				this.$store.dispatch('showSignIn', true);
			} else {
				this.dialog = true;
			}
		},
		assignTeam () {
			this.loadingAssign = true;

			Firebase.database().ref('users').child(this.user.uid).update({
				team: this.type
			})
			.then(() => {
				const message = this.type === 'red'
					? 'Служу Советскому Союзу!'
					: 'Fuck yeah!';

				this.$store.dispatch('autoSignIn', {uid: this.user.uid});
				this.dialog = false;
				this.loadingAssign = false;

				setTimeout(() => {
					this.$store
						.commit('setAlert', {type: this.type, message: message});
				}, 500);
			})
			.catch(error => {
				this.loadingAssign = false;
				this.$store
					.commit('setAlert', {type: 'error', message: error.message});
			})
		}
	},
	computed: {
		user () {
			return this.$store.getters.user;
		},
		isUserAuthenticated () {
			return Boolean(this.user);
		}
	},
	props: ['type', 'task'],
	components: {
		asset: Asset
	}
}
</script>

<style scoped lang="sass">
.card
	box-sizing: border-box
	padding: 20px
	width: 380px
	height: 320px
	position: relative
	&__task
		line-height: 30px
	&__task-wrapper
		color: #fff
		font-size: 24px
		margin-bottom: 20px
	&__start
		margin-top: 20px
		margin-bottom: 20px
	&__button
		position: absolute
		bottom: 20px
		left: 20px
		right: 20px
	&__image
		width: 100%
		img
			width: 100%
	&__asset
		display: inline-block
		margin-right: 10px
	&__headline
		display: block
		text-align: center
	&_red
		background-color: #F52323
	&_blue
		background-color: #4783FF
</style>
