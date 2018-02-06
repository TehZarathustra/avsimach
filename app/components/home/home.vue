<template>
	<div class="main-page">
		<mission-preview :mission="missionData"></mission-preview>
	</div>
</template>

<script>
import MissionPreview from '../mission-preview/mission-preview.vue';

export default {
	data () {
		return {
			missionData: {
    "active" : true,

    "bluePreview" : {
      "assets" : [
        {image: 'AV-8B', count: '2'}
      ],
      "button" : "Прикрыть корабли",
      "respawn" : true,
      "startCondition" : "Взлет с Таравы",
      "task" : "Прикрытие корабельной группы"
    },
    "campaign" : "turkish_frontier",
    "description" : "Утром 1 января турецкая корабельная группировка в составе двух групп с неизвестными намерениями пересекла границы черного моря и двигается к сочи. На связь не выходит ",
    "name" : "Новогодние гости",
    "order" : 1,
    "redPreview" : {
      "assets" : [
        {image: 'Su-25T', count: '2'},
        {image: 'Su-25T', count: '4'},
        {image: 'MiG-21', count: '2'}
      ],
      "button" : "Разведать обстановку",
      "respawn" : false,
      "startCondition" : "Старт с Сочи",
      "task" : "Разведка обстановки и демонстрация силы"
    },
    "startDate" : "Tuesday 6 February, 19:30",
    "timeLength" : "2,5 часа"
}

		}
	},
	components: {
		'mission-preview': MissionPreview
	}
}
</script>

<style scoped lang="sass">
.main-page
	width: 100%
</style>
