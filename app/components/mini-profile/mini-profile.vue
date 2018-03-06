<template>
	<div class="mini-profile">
		<v-badge overlap color="white" class="mini-profile__badge">
			<span slot="badge" class="mini-profile__badge-image" v-if="image && type === 'icon'">
				<img :src="image" alt="plane">
			</span>
			<v-avatar
			class="white"
			size="48px"
			>
				<img :src="player.avatar" alt="avatar">
			</v-avatar>
		</v-badge>
		<div class="mini-profile__info">
			<div class="mini-profile__name">{{player.name}}</div>
			<div class="mini-profile__asset" v-if="type === 'text' && title">{{title}}</div>
		</div>
	</div>
</template>

<script>
import Firebase from 'firebase';

export default {
	firebase ()  {
		return {
			assets: {
				source: Firebase.database().ref('assets'),
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
		assetItem () {
			return this.loaded && this.assets.find(item => this.player.asset === item.name);
		},
		title () {
			return this.assetItem && this.assetItem.name;
		},
		image () {
			return this.assetItem && this.assetItem.url;
		}
	},
	props: ['player', 'type']
}
</script>

<style lang="sass">
.mini-profile
	display: flex
	&__badge-image
		img
			width: 95%
			margin: 0 auto
			display: block
	&__badge
		margin-right: 10px
	&__info
		max-width: 80px
		align-self: center
	&__name, &__asset
		width: 100%
	&__asset
		font-size: .8em
</style>
