<template>
	<div class="flight">
		<div class="flight__title">
			<v-toolbar dark color="red">
				<v-toolbar-title>{{`Звено ${order + 1}, ${data.title}`}}</v-toolbar-title>
			</v-toolbar>
		</div>
		<div class="flight__content">
			<!-- players -->
			<div class="flight__players">
				<div class="flight__players-head">
					<div class="flight__players-head-item">№</div>
					<div class="flight__players-head-item">Игрок</div>
					<div class="flight__players-head-item">Вооружение</div>
				</div>
				<v-divider></v-divider>

				<div class="flight__players-items" v-for="player, index in data.slots">
					<div class="flight__players-item">{{index + 1}}
						<asset :asset="{name: player.asset}" size="30"></asset>
					</div>
					<div class="flight__players-item"><v-btn small block>Занять</v-btn></div>
					<div class="flight__players-item flight__players-item_weaponry">{{player.loadout}}</div>
				</div>
			</div>
			<!-- /players -->

			<!-- task -->
			<div class="flight__task">
				<div class="flight__task-title">Задание:</div>
				<v-divider></v-divider>
				<div class="flight__task-content">{{data.task}}</div>
			</div>
			<!-- /task -->
			<div class="flight__more">
				<v-expansion-panel expand>
					<v-expansion-panel-content>
		      <div slot="header" class="flight__more-title">Карта, маршрут и подробности</div>
		      <v-divider></v-divider>
		      <div class="flight__info-wrapper">
		      	<div class="flight__info">
		      		<v-icon>alarm</v-icon>
		      		<span>Важно соблюдать тайминги на ППМ 3</span>
		      	</div>
		      	<div class="flight__info-warning">
		      		<v-icon>warning</v-icon>
		      		<span>Каждый потерянный Су-25Т не восполняется и впоследствии заменятся на Су-25 обычный, берегите свои машины</span>
		      	</div>
		      </div>
		      <div class="flight__map">
						<div class="flight__map-image">
							<img src="https://www.mudspike.com/wp-content/uploads/2015/10/FLAG-003.jpg" alt="">
						</div>
					</div>
		    	</v-expansion-panel-content>
				</v-expansion-panel>
			</div>
		</div>
	</div>
</template>

<script>
import asset from '../asset/asset.vue';

export default {
	components: {
		asset
	},
	props: ['data', 'order']
};
</script>

<style scoped lang="sass">
.flight
	display: block
	width: 100%
	&__content
		display: flex
		flex-wrap: wrap
		justify-content: space-between
	&__players, &__task
		box-sizing: border-box
		background: #fff
		padding: 10px
		margin: 10px 5px
		box-shadow: 0 0 1px 1px rgba(0,0,0, .1)
	&__players, &__task
		width: 49%
	&__map
		width: 100%
		box-sizing: border-box
		padding: 5px
		img
			width: 100%
	&__more
		width: 100%
		margin: 0 5px
		&-title
			font-weight: bold
			font-size: 16px
	&__task
		&-title
			font-weight: bold
			font-size: 16px
			box-sizing: border-box
			padding: 10px 15px
		&-content
			display: flex
			align-items: center
			max-height: 180px
			box-sizing: border-box
			padding: 10px 15px
			overflow: hidden
	&__players-head, &__players-items
		display: flex
		align-items: baseline
	&__players-head-item, &__players-item
			width: 150px
			box-sizing: border-box
			align-items: baseline
			padding: 10px 15px
			font-size: 16px
			&:nth-child(1)
				width: 80px
			&_weaponry
				font-size: .8em
				width: 240px
	&__players-head-item
		font-weight: bold
	&__info
		&-wrapper
			padding: 5px
		&-warning
			margin-top: 10px
</style>
