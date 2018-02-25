<template>
	<div class="flight">
		<div class="flight__title">
			<v-toolbar flat dark :color="team">
				<v-toolbar-title>{{`Звено ${order + 1}, ${data.role}`}}</v-toolbar-title>
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
						<asset :asset="{name: player.craft}" size="30"></asset>
					</div>
					<div class="flight__players-item">
						<v-btn small block @click="takeSlot(index)"
							:disabled="Boolean(player.taken)">{{player.taken || 'Занять'}}</v-btn>
					</div>
					<div class="flight__players-item flight__players-item_weaponry">{{player.weapons}}</div>
				</div>
			</div>
			<!-- /players -->

			<!-- task -->
			<div class="flight__task">
				<div class="flight__task-title">Задание:</div>
				<v-divider></v-divider>
				<div class="flight__task-content">{{data.description}}</div>
			</div>
			<!-- /task -->
			<div class="flight__more">
				<v-expansion-panel expand>
					<v-expansion-panel-content>
					<div slot="header" class="flight__more-title">Карта, маршрут и подробности</div>
					<v-divider></v-divider>
					<div class="flight__info-wrapper">
						<div class="flight__info" v-if="data.alert">
							<v-icon>alarm</v-icon>
							<span>{{data.alert}}</span>
						</div>
						<div class="flight__info-warning" v-if="data.warning">
							<v-icon>warning</v-icon>
							<span>{{data.warning}}</span>
						</div>
					</div>
					<div class="flight__map">
						<div class="flight__map-image">
							<img :src="data.map" alt="карта">
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
import Firebase from 'firebase';

export default {
	components: {
		asset
	},
	computed: {
		user () {
			return this.$store.getters.user;
		},
		userName () {
			return this.user && this.user.name;
		}
	},
	methods: {
		clearPlayer () {
			let toDeleteFrom = [];

			return Firebase.database().ref('flights')
				.once('value', snapshot => snapshot)
				.then(snapshot => {
					const values = snapshot.val();

					values.forEach((outerItem, outerIndex) => {

						outerItem.slots.forEach((item, index) => {
							if (item.taken === this.userName) {
								toDeleteFrom.push({flight: outerIndex, index, outerItem});
							}
						});

					});

					return toDeleteFrom;
				})
				.then((toDeleteFrom) => {
					if (!toDeleteFrom.length) {
						return;
					}

					const updateQuery = toDeleteFrom.reduce((result, item) => {
						result[item.flight] = Object.assign(
							item.outerItem,
							{slots: item.outerItem.slots.map((innerItem, index) => {
									if (item.index === index) {
										innerItem = {
											craft: innerItem.craft,
											weapons: innerItem.weapons
										};
									}

									return innerItem;
								})
							}
						);

						return result;
					}, {});

					return Firebase.database().ref('flights').update(updateQuery);
				});
		},
		takeSlot (itemIndex) {
			this.clearPlayer().then(() => {
				const newSlotsData = this.data.slots.map((item, index) => {
					if (index === itemIndex) {
						item.taken = this.userName;
					}

					return item;
				});

				Firebase.database().ref('flights').child(this.flightKey).update({
					slots: newSlotsData
				});
			});
		}
	},
	props: ['data', 'order', 'team', 'flightKey']
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
			i
				font-size: 25px
		&-warning
			margin-top: 10px
</style>
