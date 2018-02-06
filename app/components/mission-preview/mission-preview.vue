<template>
	<div class="mission-preview">
		<div class="mission-preview__description-wrapper">
			<div class="mission-preview__date">{{date}}</div>
			<div class="mission-preview__campaign">{{campaign}}</div>
			<div class="mission-preview__row">
				<div class="mission-preview__mission">{{missionTitle}}</div>
				<div class="mission-preview__length">{{length}}</div>
			</div>
			<div class="mission-preview__description">{{description}}</div>
		</div>
		<div class="mission-preview__assign-wrapper">
			<preview-card type="red" :task="redCard"></preview-card>
			<preview-card type="blue" :task="blueCard"></preview-card>
		</div>
	</div>
</template>

<script>
import PreviewCard from './__card/mission-preview__card.vue';

export default {
	data () {
		return {
			date: this.mission.startDate,
			campaign: 'Турецкий рубеж',
			length: this.mission.timeLength,
			description: this.mission.description,
			redCard: this.mission.redPreview,
			blueCard: this.mission.bluePreview
		}
	},
	computed: {
		missionTitle () {
			return `Миссия ${this.mission.order}: ${this.mission.name}`;
		}
	},
	props: ['mission'],
	components: {
		'preview-card': PreviewCard
	}
}
</script>

<style scoped lang="sass">
.mission-preview
	max-width: 850px
	width: 100%
	margin: 0 auto
	background-image: url('https://i.imgur.com/7ukd9wC.png')
	background-size: 50%
	background-position: 100% 0
	&__date
		font-size: 44px
		font-weight: bold
	&__campaign
		font-size: 34px
	&__row
		display: flex
		justify-content: baseline
		margin-top: 10px
		margin-bottom: 50px
	&__mission
		background-color: #FFDC3C
		padding: 5px 10px
		font-size: 16px
		border-radius: 10px
		margin-right: 10px
	&__length
		font-weight: bold
		font-size: 22px
	&__description
		font-size: 24px
		max-width: 600px
	&__assign-wrapper
		margin-top: 20px
		display: flex
		flex-wrap: wrap
		justify-content: space-between
</style>
