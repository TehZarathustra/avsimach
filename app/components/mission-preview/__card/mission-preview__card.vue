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
			<v-btn @click.native.stop="dialog = true" block>{{buttonLabel}}</v-btn>
		</div>
		<v-dialog v-model="dialog" max-width="380">
      <v-card>
        <v-card-title class="headline">Стать {{type === 'red' ? 'Красным' : 'Синяком'}}?</v-card-title>
        <div class="card__image" v-if="type === 'red'">
        	<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Communist_star.svg/2000px-Communist_star.svg.png" alt="">
        </div>
        <div class="card__image" v-else>
        	<img src="https://i.imgur.com/MRr0qik.png" alt="">
        </div>
        <v-card-text>Соглашаясь, ты становишься прикреплен к {{type === 'red' ? 'Красным' : 'Синим'}} до окончания кампании</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="type" flat="flat" @click.native="dialog = false">Подумать</v-btn>
          <v-btn :color="type" flat="flat" @click.native="dialog = false">Вступить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
	</div>
</template>

<script>
import Asset from '../../asset/asset.vue';

export default {
	data () {
		return {
			dialog: false,
			missionTask: this.task.task,
			start: this.task.startCondition,
			buttonLabel: this.task.button,
			typeClasses: {
				card_red: this.type === 'red',
				card_blue: this.type === 'blue'
			}
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
	&_red
		background-color: #F52323
	&_blue
		background-color: #4783FF
</style>
