<template>
	<div class="mission">

		<div class="mission__item mission__item_info">
			<v-expansion-panel expand>
				<v-expansion-panel-content v-bind:value="true">
				<div slot="header"><div class="title">Ситуация</div></div>
				<div class="mission__content">
					<div class="m-image">
					<img src="https://i.imgur.com/s0iwVes.jpg" alt="">
					</div>
					<p class="m-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iste, quam. Nobis consequuntur obcaecati blanditiis et debitis cum itaque quam eum explicabo illo soluta quisquam ad maxime aliquid saepe nostrum, nulla odit dolore voluptatum temporibus vitae! Quis incidunt iusto quaerat neque corporis vel labore est ipsam minima unde cum eum, ad, facilis soluta tempore laudantium voluptate aliquid, quo. Pariatur minus laborum perferendis quia, necessitatibus facere quae eaque, quisquam illum commodi, quo quasi voluptas expedita reprehenderit impedit praesentium repellendus dignissimos dolor, similique consequuntur id nobis dolores. At itaque quisquam aperiam et eaque aspernatur eius sint accusantium. Beatae quos voluptatibus, harum consequatur.</p>
				</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</div>

		<div class="mission__item mission__item_blue">
			<v-expansion-panel expand>
				<v-expansion-panel-content v-bind:value="false">
					<div slot="header"><div class="title">Задание для синих 1/4</div></div>
					<div class="mission__content">
						<p class="m-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio magni possimus neque laborum, doloremque cupiditate ipsam nesciunt culpa ipsa consectetur, aperiam nisi ad! Vitae, voluptatum ratione rem voluptates, tempore veniam.</p>
						<div class="m-image">
						<img src="https://i.ytimg.com/vi/5GBfwWbtDU0/maxresdefault.jpg" alt="">
						</div>
						<div class="m-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, sit esse. Molestiae, molestias, veritatis repellendus repudiandae voluptates praesentium labore fugit ratione commodi nihil consequatur nesciunt dignissimos necessitatibus nam. Rem, modi!</div>
					</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</div>

		<div class="mission__item mission__item_red">
			<v-expansion-panel expand>
				<v-expansion-panel-content v-bind:value="false">
					<div slot="header"><div class="title">Задание для красных 3/4</div></div>
					<div class="mission__content">
						<p class="m-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio magni possimus neque laborum, doloremque cupiditate ipsam nesciunt culpa ipsa consectetur, aperiam nisi ad! Vitae, voluptatum ratione rem voluptates, tempore veniam.</p>
						<div class="m-image">
						<img src="https://i.ytimg.com/vi/5GBfwWbtDU0/maxresdefault.jpg" alt="">
						</div>
						<div class="m-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, sit esse. Molestiae, molestias, veritatis repellendus repudiandae voluptates praesentium labore fugit ratione commodi nihil consequatur nesciunt dignissimos necessitatibus nam. Rem, modi!</div>
					</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</div>
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

<style lang="sass">
.mission
	max-width: 1200px
	margin: 0 auto
	width: 100%
	&__item
		margin-bottom: 20px

.m-image
	img
		width: 100%

.m-text
	padding: 5px 10px

.expansion-panel__container
    position: relative
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1)
    width: 100%
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)

.mission__item_info
	.expansion-panel__header
		background-color: #ffc107 !important

.mission__item_blue
	.expansion-panel__header
		background-color: #2196F3 !important

.mission__item_red
	.expansion-panel__header
		background-color: #FF5252 !important

.expansion-panel__header
	padding: 12px 13px
</style>
