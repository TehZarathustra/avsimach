<template>
	<div class="asset" :title="title">
		<v-badge overlap color="black" v-if="loaded">
      <span slot="badge" v-if="asset.count">{{asset.count}}</span>
      <v-avatar
        class="white"
        :size="`${size || 48}px`"
      >
        <img :src="image" :alt="title">
      </v-avatar>
    </v-badge>
    <v-badge overlap color="black" v-else>
      <v-avatar
        class="white"
        :size="`${size || 48}px`"
      >
      <v-progress-circular indeterminate v-bind:size="size - 2" color="primary"></v-progress-circular>
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
	props: ['asset', 'size']
}
</script>

<style scoped lang="sass">
.asset
	display: inline-block
	img
		// filter: invert(100%)
		width: 80%
		height: 80%
</style>
