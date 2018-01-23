<template>
	<v-toolbar color="secondary" dense fixed clipped-left app>
		<v-toolbar-title
		:style="$vuetify.breakpoint.width > 1264 && 'width: 300px'"
		class="ml-0 pl-3"
		:class="$vuetify.breakpoint.width <= 1264 && 'pr-3'"
		>
			<v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
			<v-icon class="ml-3">fa-fighter-jet</v-icon>
		</v-toolbar-title>
		<v-layout row align-center style="max-width: 650px">
			Грядущая миссия 1 февраля в 15:00 по мск
		</v-layout>
	</v-toolbar>
</template>

<script>
export default {
	data() {
		return {
			drawer: this.$store.getters.drawer
		}
	},
	methods: {
		toggleDrawer() {
			this.$store.dispatch('toggleDrawer');

			console.log(this.$store.getters.drawer);
		}
	}
}
</script>
