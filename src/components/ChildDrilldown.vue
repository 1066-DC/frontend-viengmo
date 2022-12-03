<template>
  <div>
    <BaseBox
      :class="[
        'flex',
        'bg-neutral-200',
        'justify-space-around',
        window.width < 1170 ? 'align-start' : 'align-center',
        window.width < 1170 ? 'flex-column' : '',
      ]"
      v-for="d in demographics"
      :key="d.id"
    >
      <BaseMetric
        :label="$t(getChildGranularity(granularity))"
        :value="d[label]"
        title
        :class="[window.width < 1170 ? '' : 'w-4']"
      />
      <div
        :class="[
          'flex',
          'align-center',
          window.width < 1170 ? 'full-width' : '',
        ]"
      >
        <BaseMetric
          v-for="metric in demographicsBoxes"
          :key="metric.key"
          :label="metric.label"
          :value="formatNumber(d[metric.key], 0)"
        />
        <BaseButton
          icon="arrow-right-bold"
          :light="true"
          @click="goToAnalytics(getChildGranularity(granularity), d.id)"
        >
        </BaseButton>
      </div>
    </BaseBox>
  </div>
</template>

<i18n>
{
  "en": {
    "more": "More",
    "name": "Name",
    "province": "Province",
    "district": "District",
    "village": "Village",
    "project-type": "Project type",
    "projects_list": "Projects list"
  },
  "la": {
    "more": "ເພີ່ມເຕີມ",
    "name": "ຊື່",
    "province": "ແຂວງ",
    "district": "ເມືອງ",
    "village": "ບ້ານ",
    "project-type": "ປະເພດໂຄງການ",
    "projects_list": "ບັນຊີລາຍຊື່ໂຄງການ"
  }
}
</i18n>

<script>
import router from '@/router';
import { formatNumber, getChildGranularity } from '@/helpers';

export default {
  name: 'ChildDrilldown',
  props: [
    'granularity',
    'demographics',
    'demographicsBoxes',
    'window',
    'projectType',
    // 'anchor',
  ],
  computed: {
    label() {
      return this.$i18n.locale === 'la' ? 'name_la' : 'name_en';
    },
  },
  methods: {
    getChildGranularity,
    formatNumber,
    goToAnalytics(granularity, value) {
      // const el = this.$el.getElementsByClassName('anchor')[0];
      // console.log(el);
      // if (el) {
      //   el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // }
      router.push({
        name: 'analytics',
        params: { granularity, value, projectType: this.projectType },
      });
    },
  },
};
</script>

<style>
</style>