<template>
	<v-navigation-drawer
	fixed
	:clipped="$vuetify.breakpoint.width > 1264"
	:value="computedDrawer"
	app
	>
		<v-list>
          <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					action: 'fa-fighter-jet',
					title: 'Кампании',
					active: true,
					items: [
						{title: 'Турецкий рубеж'},
						{title: 'Пчелинное гнездо'}
					]
				},
				{
					action: 'fa-users',
					title: 'Игроки',
					active: false,
					items: [
          { avatar: 'http://sm.evg-rumjantsev.ru/img/fedotov3.jpg', title: 'Kekel' },
          { avatar: 'http://sm.evg-rumjantsev.ru/img/fedotov3.jpg', title: 'Pekel' }
        ]
				}
			]
		}
	},
	computed: {
		computedDrawer() {
			return this.$store.getters.drawer;
		}
	}
}
</script>
