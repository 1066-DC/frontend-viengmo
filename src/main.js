import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './assets/tailwind.css';
import VueI18n from 'vue-i18n';
import VueCompositionAPI from '@vue/composition-api';
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

import BaseTitle from '@/components/BaseTitle.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseBox from '@/components/BaseBox.vue';
import BaseMetric from '@/components/BaseMetric.vue';
import BaseTable from '@/components/BaseTable.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseDonut from '@/components/BaseDonut.vue';
import BaseLine from '@/components/BaseLine.vue';
import BaseBar from '@/components/BaseBar.vue';
import BaseImage from '@/components/BaseImage.vue';
import VueApexCharts from 'vue-apexcharts';
import JsonCSV from 'vue-json-csv';
import VueMarkdown from 'vue-markdown'

Vue.config.productionTip = false;
Vue.use(VueApexCharts);
Vue.use(VueCompositionAPI);
Vue.use(VueI18n);
Vue.use(VueViewer);

Vue.component('BaseTitle', BaseTitle);
Vue.component('BaseButton', BaseButton);
Vue.component('BaseBox', BaseBox);
Vue.component('BaseMetric', BaseMetric);
Vue.component('BaseTable', BaseTable);
Vue.component('BaseIcon', BaseIcon);
Vue.component('ApexChart', VueApexCharts);
Vue.component('BaseDonut', BaseDonut);
Vue.component('BaseLine', BaseLine);
Vue.component('BaseBar', BaseBar);
Vue.component('BaseImage', BaseImage);
Vue.component('downloadCsv', JsonCSV);
Vue.component('VueMarkdown', VueMarkdown);

const i18n = new VueI18n({
  locale: 'en',
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
