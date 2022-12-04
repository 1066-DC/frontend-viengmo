import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: () => {
      return { path: '/main/country/laos' };
    },
  },
  {
    name: 'main',
    props: true,
    path: '/main/:granularity/:value/',
    component: () => import(/* webpackChunkName: "main" */ '../components/TheHome.vue'),
  },
  {
    path: '/buildings/:id',
    props: true,
    name: 'building',
    component: () => import(/* webpackChunkName: "main" */ '../components/TheBuilding.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "main" */ '../components/TheSettings.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
