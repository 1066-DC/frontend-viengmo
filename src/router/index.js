import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '../components/TheHome.vue'),
  },
  {
    path: '/buildings/:id',
    props: true,
    name: 'building',
    component: () => import(/* webpackChunkName: "main" */ '../components/TheBuilding.vue'),
  },
  {
    path: '/architectural-elements',
    props: true,
    name: 'Architectural Elements',
    component: () => import(/* webpackChunkName: "main" */ '../components/ArchitecturalElements.vue'),
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
