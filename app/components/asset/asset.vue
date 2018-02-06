<template>
	<div class="asset" :title="title">
		<v-badge overlap color="black">
      <span slot="badge">{{count}}</span>
      <v-avatar
        class="white"
      >
        <img :src="image" :alt="title">
      </v-avatar>
    </v-badge>
	</div>
</template>

<script>
const IMAGES = {
	'Su-25': 'https://firebasestorage.googleapis.com/v0/b/avsimach.appspot.com/o/su25icon.png?alt=media&token=66a8d62d-1f85-4401-8e0b-9019473e74d3',
	'Su-25T': 'https://firebasestorage.googleapis.com/v0/b/avsimach.appspot.com/o/su25icon.png?alt=media&token=66a8d62d-1f85-4401-8e0b-9019473e74d3',
	'AV-8B': 'https://firebasestorage.googleapis.com/v0/b/avsimach.appspot.com/o/av8bicon.png?alt=media&token=8578dc8b-0eda-4dd7-a431-3517f01b7c45',
	'MiG-21': 'https://firebasestorage.googleapis.com/v0/b/avsimach.appspot.com/o/mig21bisicon.png?alt=media&token=ad34d2c8-c693-4b77-b8a9-7576a0b8d62e'
};

export default {
	data () {
		return {
			title: this.asset.image,
			image: IMAGES[this.asset.image],
			count: this.asset.count
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
