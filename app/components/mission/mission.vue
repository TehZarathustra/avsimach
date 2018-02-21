<template>
	<div class="mission">
		<h1>Миссия 1, Конец каникулам</h1>
		<div class="mission__general-wrapper">
			<div class="mission__general-item">
				<h2>Условия и погода</h2>
				<ul>
					<li>Солнечно, 12:00, Облачность на 600 метрах</li>
					<li>Ветер у земли 7 м/c, направление 169</li>
					<!-- <li></li> -->
				</ul>
			</div>

			<div class="mission__general-item">
				<h2>Аэродромы</h2>
				<ul>
					<li>Основной: Сочи-Адлер</li>
					<li>Запасной: Майкоп</li>
				</ul>
			</div>

			<div class="mission__general-item">
				<h2>Вероятные угрозы</h2>
				<div class="mission__general-threats">
					<asset :asset="{name: 'AV-8B'}"></asset>
					<asset :asset="{name: 'F-5'}"></asset>
				</div>
			</div>

		</div>
		<div class="mission__flights">
			<flight v-for="(flight, index) in flights"
				:data="flight"
				:order="index"
				:key="index"></flight>
		</div>
	</div>
</template>

<script>
import flight from '../flight-card/flight-card.vue';
import asset from '../asset/asset.vue';

export default {
	data () {
		return {
			flights: [
				{
					title: 'Штурмовики',
					slots: [
						{
							asset: 'Su-25T',
							loadout: '2 x КХ-25Л, ПТБ 800л, 2 x Р-60М, Меркурий'
						},
						{
							asset: 'Su-25T',
							loadout: '2 x КХ-25Л, ПТБ 800л, 2 x Р-60М'
						},
						{
							asset: 'Su-25',
							loadout: '2 x КХ-25Л, ПТБ 800л, 2 x Р-60М'
						},
						{
							asset: 'Su-25',
							loadout: '2 x КХ-25Л, ПТБ 800л, 2 x Р-60М'
						}
					],
					task: 'Следуя по маршруту, провести показательный полет над кораблями Турок. В случае агрессии, наше звено будет слабо защищено от ПВО противника. В такой экстренной ситуации, единственным спасением будет предельно малая высота. По предварительным предположениям, на высоте до 10-20 метров мы будем незаметны. Отход и атаку следуют проводить только в случае уверенности в своих силах. При любых непонятных ситуациях, возвращаться на базу.'
				},
				{
					title: 'Истребители',
					slots: [
						{
							asset: 'MiG-21',
							loadout: '4 x Р-60М, ПТБ 800Л'
						},
						{
							asset: 'MiG-21',
							loadout: '4 x Р-60М, ПТБ 800Л'
						}
					],
					task: 'Обеспечить прикрытие штурмовиков в 50км западнее их маршрута. Вероятен вражеский перехват основной группировки потенциального противника. В таком случае, следует ожидать звено AV-8B N/A с AIM-9M. При агрессии, не рекомендуется ввязываться в маневренный бой. Следует атаковать на проходах и вертикалях.'
				}
			]
		}
	},
	mounted () {
		console.log('this.$router >', this.$route.params);
	},
	components: {
		flight,
		asset
	}
}
</script>

<style scoped lang="sass">
.mission
	max-width: 1000px
	width: 100%
	margin: 0 auto
	&__flights
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		> div
			margin-bottom: 20px
	&__general-wrapper
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		margin: 10px 5px
	&__general-item
		li
			list-style: none
</style>
