<template>
  <div class="map-view rounded-md flex">
    <div id="map"></div>
    <div
      class="flex flex-column pa-4 align-center bg-white justify-around"
      id="analytics"
    >
      <BaseTitle>
        {{ this.display | capitalizeFirst }}
      </BaseTitle>
      <BaseButton
        icon="arrow-right-bold"
        :light="true"
        :small="false"
        @click="goToAnalytics"
      >
        <span>{{ $t('analytics') }}</span>
      </BaseButton>

      <BaseBox class="flex flex-column bg-neutral-200 w-full flex-initial">
        <BaseTitle :subtitle="true">{{ $t('farmer-groups') }}</BaseTitle>
        <div class="flex flex-initial">
          <BaseMetric
            :label="$t('number-of-groups')"
            :value="
              formatNumber(
                analyticsData
                  .map((d) =>
                    Number(d.number_of_groups ? d.number_of_groups : 0),
                  )
                  .reduce((acc, a) => acc + a, 0),
                0,
              )
            "
            icon="home"
          />
          <BaseMetric
            :label="$t('total_group_members')"
            :value="
              formatNumber(
                analyticsData
                  .map((d) =>
                    Number(d.number_of_members ? d.number_of_members : 0),
                  )
                  .reduce((acc, a) => acc + a, 0),
                0,
              )
            "
            icon="crowd"
          />
        </div>
        <div class="flex flex-initial">
          <BaseMetric
            :label="$t('total_area_cultivated')"
            icon="tractor"
            :value="`${formatNumber(
              analyticsData
                .map((d) =>
                  Number(d.cultivated_land_area ? d.cultivated_land_area : 0),
                )
                .reduce((acc, a) => acc + a, 0),
              0,
            )} ha`"
          />
        </div>
      </BaseBox>
      <BaseBox class="flex flex-column bg-neutral-200 w-full flex-initial">
        <BaseTitle :subtitle="true">{{ $t('agri-businesses') }}</BaseTitle>
        <div class="flex flex-initial">
          <BaseMetric
            :label="$t('number_of_businesses')"
            :value="
              formatNumber(
                analyticsData
                  .map((d) =>
                    Number(d.number_of_businesses ? d.number_of_businesses : 0),
                  )
                  .reduce((acc, a) => acc + a, 0),
                0,
              )
            "
            icon="handshake-outline"
          />
        </div>
      </BaseBox>
      <BaseBox class="flex flex-column bg-neutral-200 w-full flex-initial">
        <BaseTitle :subtitle="true">{{ $t('irrigation_schemes') }}</BaseTitle>
        <div class="flex flex-initial">
          <BaseMetric
            :label="$t('number_of_projects')"
            :value="
              formatNumber(
                analyticsData
                  .map((d) =>
                    Number(
                      d.number_of_irrigation_scheme
                        ? d.number_of_irrigation_scheme
                        : 0,
                    ),
                  )
                  .reduce((acc, a) => acc + a, 0),
                0,
              )
            "
            icon="waves"
          />
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "farmer-groups": "Farmer groups",
    "number-of-groups": "Number of groups",
    "total_group_members": "Total group members",
    "total_area_cultivated": "Total area cultivated",
    "agri-businesses": "Agri-businesses",
    "number_of_businesses": "Number of businesses",
    "irrigation_schemes": "Irrigation schemes",
    "number_of_projects": "Number of projects",
    "analytics": "Analytics",
    "more": "More"
  },
  "la": {
    "farmer-groups": "ກຸ່ມຊາວກະສິກອນ",
    "number-of-groups": "ຈໍາ​ນວນ​ຂອງ​ກຸ່ມ​",
    "total_group_members": "ສະມາຊິກກຸ່ມທັງໝົດ",
    "total_area_cultivated": "ເນື້ອທີ່ປູກຝັງທັງໝົດ",
    "agri-businesses": "ທຸລະກິດກະສິກຳ",
    "number_of_businesses": "ຈໍາ​ນວນ​ທຸ​ລະ​ກິດ​",
    "irrigation_schemes": "ໂຄງການຊົນລະປະທານ",
    "number_of_projects": "ຈໍານວນໂຄງການ",
    "analytics": "ການວິເຄາະ",
    "more": "ເພີ່ມເຕີມ"
  }
}
</i18n>

<script>
import {
  createApp,
  defineComponent,
  nextTick,
  toRef,
  watch,
} from '@vue/composition-api';
// import MainService from '@/services/MainService.js';
import mapboxgl from 'mapbox-gl';
import VillagePopup from '@/components/VillagePopup.vue';
import router from '@/router';
import { formatNumber } from '@/helpers';
import { useMap } from '@/hooks/useMap.js';
import { capitalizeFirst } from '@/helpers';

export default defineComponent({
  name: 'MapView',
  filters: {
    capitalizeFirst,
  },
  props: {
    granularity: {
      type: String,
    },
    value: {
      type: String,
    },
    provinces: {
      type: Array,
      default() {
        return [];
      },
    },
    districts: {
      type: Array,
      default() {
        return [];
      },
    },
    villages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    label() {
      return this.$i18n.locale === 'la' ? 'name_la' : 'name_en';
    },
    display() {
      if (this.granularity === 'country') {
        return this.$i18n.locale === 'la' ? 'ໂຄງການ' : 'Project';
      }
      const element = [...this.provinces, ...this.districts].find(
        (p) => p.id === this.value,
      );
      if (element) {
        return element[this.label];
      }
      return '';
    },
    analyticsData() {
      if (this.value === 'laos') {
        return this.villages;
      }
      return this.villages.filter(
        (v) => v[`${this.granularity}_id`] === this.value,
      );
    },
  },
  methods: {
    formatNumber,
    goToAnalytics() {
      router.push({
        name: 'analytics',
        params: {
          granularity: this.granularity,
          value: this.value,
          projectType: 'all',
        },
      });
    },
  },
  setup(props) {
    const { mapPromise } = useMap(
      toRef(props, 'granularity'),
      toRef(props, 'value'),
      toRef(props, 'villages'),
      6,
    );

    watch(mapPromise, (mapPromise) => {
      mapPromise.then((map) => {
        map.addLayer({
          id: 'markers',
          type: 'circle',
          source: 'markers',
          paint: {
            'circle-color': '#ff0000',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': 'black',
            'circle-radius': 8,
          },
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          maxWidth: '500px',
          anchor: 'left',
        });

        map.on('mouseenter', 'villages', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const village = e.features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup
            .setLngLat(coordinates)
            .setHTML('<div id="popup-content"></div>')
            .addTo(map);

          const popupContent = defineComponent({
            extends: VillagePopup,
            setup() {
              return { village };
            },
          });

          nextTick(() => {
            createApp(popupContent).mount('#popup-content');
          });
        });

        map.on('mouseleave', 'villages', () => {
          popup.remove();
        });
      });
    });

    return {};
  },
});
</script>

<style scoped>
#map {
  height: 80vh;
  width: 75%;
}

#analytics {
  width: 25%;
}
</style>
