import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/home/home.vue';
import Mission from '../components/mission/mission.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/campaigns/:campaign/:mission', component: Mission}
];

Vue.use(VueRouter);

export default new VueRouter({routes});
