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
    <v-spacer></v-spacer>
    <div class="kek" v-if="isUserAuthenticated">
	    <v-avatar size="36px" slot="activator">
        <img src="http://nebo.histrf.ru/img/pilots/Покрышкин/ava.png" alt="">
      </v-avatar> TehZarathustra
      <v-btn flat icon>
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn flat icon @click="signOut()">
        <v-icon>subdirectory_arrow_left</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="280px" v-if="!isUserAuthenticated">
    	<v-btn flat slot="activator">Войти</v-btn>
      <form @submit.prevent.stop="signIn" class="form-signin" role="form">
					<v-text-field
					name="email"
					label="Email"
					single-line
					type="email"
					v-model="email"
					required
					prepend-icon="mail_outline"
					></v-text-field>
					<v-text-field
					name="password"
					label="Password"
					single-line
					type="password"
					v-model="password"
					required
					prepend-icon="vpn_key"
					></v-text-field>
          <v-btn block color="primary" :loading="loading" type="submit">Войти</v-btn>
      </form>
    </v-dialog>
	</v-toolbar>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			drawer: this.$store.getters.drawer,
			email: null,
			password: null,
			loading: false
		}
	},
	computed: {
		isUserAuthenticated () {
			return this.$store.getters.user !== null
				&& this.$store.getters.user !== undefined;
		}
	},
	methods: {
		toggleDrawer() {
			this.$store.dispatch('toggleDrawer');
		},
		signIn () {
			this.loading = true;

			this
				.$store
				.dispatch('signUserIn', {email: this.email, password: this.password})
				.then(data => {
					if (data === 'error') {
						this.loading = false;
					} else {
						this.email = null,
						this.loading = false;
						this.password = null;
						this.dialog = false;
					}
				});
		},
		signOut () {
			this.$store.dispatch('signOut');

			this.loading = false;
		}
	}
}
</script>

<style scoped lang="sass">
.image-user
	color: lightgray !important
	font-size: 150px
.form-signin
	padding: 10px 20px
	background-color: #fff
</style>
