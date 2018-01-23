<template>
	<div class="home">
		<img v-bind:src='logoImg'>
		<h1>{{greeting}}</h1>
		<button v-on:click='start'>does it work?</button>
	</div>
</template>

<script>
import logo from '../../outdated-browser.png'
export default {
	data () {
		return {
			user: this.$store.getters.user || 'someone',
			logoImg: logo
		}
	},
	computed: {
		greeting () {
			return `Hello, ${this.user}!`;
		}
	},
	methods: {
		start () {
			alert('it does');
		}
	}
}
</script>

<style scoped lang="sass">
	.home
		padding: 30px
		background: lightblue
		margin: 20px auto
		max-width: 800px
		text-align: center
	img
		width: 100%
</style>
