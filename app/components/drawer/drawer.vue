<template>
	<v-navigation-drawer
	fixed
	:clipped="$vuetify.breakpoint.width > 1264"
	:value="computedDrawer"
	app
	>
		<v-list dense>

		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	computed: {
		computedDrawer() {
			return this.$store.getters.drawer;
		}
	}
}
</script>
