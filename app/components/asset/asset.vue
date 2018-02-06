<template>
	<div class="asset" :title="title">
		<v-badge overlap color="black" v-if="loaded">
      <span slot="badge">{{asset.count}}</span>
      <v-avatar
        class="white"
      >
        <img :src="image" :alt="title">
      </v-avatar>
    </v-badge>
    <v-badge overlap color="black" v-else>
      <v-avatar
        class="white"
      >
      	<v-progress-circular indeterminate v-bind:size="40" color="primary"></v-progress-circular>
      </v-avatar>
    </v-badge>
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
			return this.loaded && this.assets.find(item => this.asset.name === item.name);
		},
		title () {
			return this.assetItem && this.assetItem.name;
		},
		image () {
			return this.assetItem && this.assetItem.url;
		}
	},
	props: ['asset']
}
</script>

<style scoped lang="sass">
.asset
	display: inline-block
	width: 50px
	img
		// filter: invert(100%)
		width: 80%
		height: 80%
</style>
