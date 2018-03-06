import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/home/home.vue';
import Mission from '../components/mission/mission.vue';
import Results from '../components/results/results.vue';
import Duel from '../components/duel/duel.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/campaigns/:campaign/:mission', component: Mission},
  {path: '/results', component: Results},
  {path: '/duel', component: Duel}
];

Vue.use(VueRouter);

export default new VueRouter({routes});
