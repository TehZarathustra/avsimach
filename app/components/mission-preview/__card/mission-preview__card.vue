<template>
	<div class="card" v-bind:class="typeClasses">
		<div class="card__task">Задача:<br/>{{missionTask}}</div>
		<div class="card__start">{{start}}</div>
		<div class="card__assets">
			<div class="card__asset" v-for="asset in task.assets">
				<asset :asset='asset'></asset>
			</div>
		</div>
		<div class="card__button">
			<v-btn block>{{buttonLabel}}</v-btn>
		</div>
	</div>
</template>

<script>
import Asset from '../../asset/asset.vue';

export default {
	data () {
		return {
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
	color: #fff
	font-size: 24px
	&__task
		line-height: 30px
	&__start
		margin-top: 20px
		margin-bottom: 20px
	&__button
		position: absolute
		bottom: 20px
		left: 20px
		right: 20px
	&__asset
		display: inline-block
		margin-right: 10px
	&_red
		background-color: #F52323
	&_blue
		background-color: #4783FF
</style>
