<template>
	<v-snackbar
      :timeout="timeout"
      :color="color"
      v-model="snackbar"
    >
		{{text}}
    	<v-btn dark flat @click.native="snackbar = false">Закрыть</v-btn>
    </v-snackbar>
</template>

<script>
export default {
	data () {
		return {
			timeout: 6000,
			color: 'error',
			snackbar: false
		}
	},
	computed: {
		text () {
			const alert = this.$store.getters.alert;

			if (alert) {
				this.snackbar = true;
				this.color = alert.type;

				return alert.message;
			}

			return null;
		}
	}
}
</script>
