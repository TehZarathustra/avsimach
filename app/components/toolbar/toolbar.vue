<template>
	<v-toolbar dense fixed clipped-left app>
		<v-toolbar-title
		:style="$vuetify.breakpoint.width > 1264 && 'width: 300px'"
		class="ml-0 pl-3"
		:class="$vuetify.breakpoint.width <= 1264 && 'pr-3'"
		>
			<v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
			<span class="title">Avsimach</span>
		</v-toolbar-title>
		<!-- <v-layout>
			<div class="headline">Миссия 1: Очень странные дела
				<v-chip label text-color="">
					<v-icon left>label</v-icon>В процессе
				</v-chip>
			</div>
		</v-layout> -->
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
