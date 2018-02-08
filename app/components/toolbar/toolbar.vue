<template>
	<v-toolbar dense fixed clipped-left :dark="(user && user.team)" :color="(user && user.team)" :class="userTeam" app>
		<v-toolbar-title
		:style="$vuetify.breakpoint.width > 1264 && 'width: 300px'"
		class="ml-0 pl-3"
		:class="$vuetify.breakpoint.width <= 1264 && 'pr-3'"
		>
			<v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
			<span class="title"><a href="/#/">Avsimach</a></span>
		</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isUserAuthenticated">
	    <v-avatar size="36px" :title="user.name">
        <img :src="user.avatar" alt="avatar">
      </v-avatar>
      <v-btn flat icon>
        <v-icon>star</v-icon>
      </v-btn>
      <!-- profiled edit start -->
			<v-dialog v-model="profileForm" max-width="280px">
	    	<v-btn flat icon slot="activator">
	        <v-icon>settings</v-icon>
	      </v-btn>
	      <form @submit.prevent.stop="saveProfile" class="form-signin" role="form">
	      		<div class="headline headline-form">Настройки профиля</div>
	      		<div class="form-signin__avatar">
							<v-avatar size="150px" slot="activator">
	        			<img :src="newAvatar || user.avatar" alt="avatar">
	      			</v-avatar>
      			</div>
      			<v-text-field
						name="avatar"
						label="Новая аватарка (url)"
						type="text"
						v-model="newAvatar"
						prepend-icon="crop_original"
						></v-text-field>
      			<v-btn flat color="secondary"
							@click="signInForm = false; newAvatar = null">Отмена</v-btn>
	          <v-btn flat color="primary" :loading="loadingProfile" type="submit">Сохранить</v-btn>
	     </form>
	    </v-dialog>
      <!-- profile edit finish -->
      <v-btn flat icon @click="signOut()">
        <v-icon>subdirectory_arrow_left</v-icon>
      </v-btn>
    </div>
    <!-- sign in form start -->
    <v-dialog v-model="signInForm" max-width="280px" v-if="!isUserAuthenticated">
    	<v-btn flat slot="activator">Войти</v-btn>
			<v-toolbar dark color="primary">
				<v-toolbar-title class="white--text">Надо залогиниться</v-toolbar-title>
			</v-toolbar>
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
          <v-btn block color="primary" :loading="loadingSignIn" type="submit">Войти</v-btn>
      </form>
    </v-dialog>
    <!-- sign in form finish -->
	</v-toolbar>
</template>

<script>
import Firebase from 'firebase';

export default {
	data() {
		return {
			signInForm: this.showSignIn,
			profileForm: false,
			newAvatar: null,
			drawer: this.$store.getters.drawer,
			email: null,
			password: null,
			loadingSignIn: false,
			loadingProfile: false
		}
	},
	watch: {
		showSignIn() {
			if (this.showSignIn) {
				this.signInForm = true;
			}
		}
	},
	computed: {
		user () {
			return this.$store.getters.user;
		},
		isUserAuthenticated () {
			return Boolean(this.user);
		},
		userTeam () {
			return this.user && {
				toolbar_red: this.user.team === 'red',
				toolbar_blue: this.user.team === 'blue'
			}
		},
		showSignIn () {
			return this.$store.getters.showSignIn;
		}
	},
	methods: {
		toggleDrawer() {
			this.$store.dispatch('toggleDrawer');
		},
		saveProfile () {
			this.loadingProfile = true;

			Firebase.database().ref('users').child(this.user.uid).update({
				avatar: this.newAvatar
			})
			.then(() => {
				this.$store
					.commit('setAlert', {type: 'success', message: 'Аватар успешно изменен'});
				this.$store.dispatch('autoSignIn', {uid: this.user.uid});

				this.loadingProfile = false;
			})
			.catch(error => {
				this.loadingProfile = false;
				this.$store
					.commit('setAlert', {type: 'error', message: error.message});
			})
		},
		signIn () {
			this.loadingSignIn = true;

			this
				.$store
				.dispatch('signUserIn', {email: this.email, password: this.password})
				.then(data => {
					if (data === 'error') {
						this.loadingSignIn = false;
					} else {
						this.email = null,
						this.loadingSignIn = false;
						this.password = null;
						this.signInForm = false;
					}
				});
		},
		signOut () {
			this.$store.dispatch('signOut');

			this.loadingSignIn = false;
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
	&__avatar
		justify-content: center
		display: flex
		margin-bottom: 10px
.headline-form
	margin-bottom: 20px
.title a
	color: #000
	font-weight: bold
	position: relative
	top: 2px
	text-decoration: none
.toolbar_red, .toolbar_blue
	.title a
		color: #fff
.toolbar_red .title:before
	content: ''
	display: inline-block
	position: relative
	top: 8px
	margin-right: 5px
	width: 30px
	height: 30px
	background-image: url(../../red_black.png)
	background-size: 100%
	background-repeat: no-repeat
	filter: invert(100%)
.toolbar_blue .title:before
	content: ''
	display: inline-block
	position: relative
	top: 10px
	margin-right: 5px
	width: 30px
	height: 30px
	background-image: url(../../blue_black.png)
	background-repeat: no-repeat
	background-size: 100%
	filter: invert(100%)
</style>
