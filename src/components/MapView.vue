<template>
  <div class="map-view rounded-md flex">
    <div id="map"></div>
    <div
      class="flex flex-column pa-4 align-center bg-white justify-around"
      v-if="false"
    >
      <BaseTitle>
        Buildings
      </BaseTitle>

      <BaseBox class="flex flex-column bg-neutral-200 w-full flex-initial">
        <BaseTitle :subtitle="true">Mapped</BaseTitle>
        <div class="flex flex-initial">
          <BaseMetric
            label="Number"
            icon="tractor"
            :value="10"
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
  ref,
} from '@vue/composition-api';
// import MainService from '@/services/MainService.js';
import mapboxgl from 'mapbox-gl';
import BuildingPopup from '@/components/BuildingPopup.vue';
import { formatNumber } from '@/helpers';
import { useMap } from '@/hooks/useMap.js';
import { capitalizeFirst } from '@/helpers';

export default defineComponent({
  name: 'MapView',
  filters: {
    capitalizeFirst,
  },
  props: {
    buildings: {
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
  },
  methods: {
    formatNumber,
  },
  setup(props) {
    const { mapPromise } = useMap(
      toRef(props, 'buildings'),
      ref(null),
      12,
    );

    watch(mapPromise, (mapPromise) => {
      mapPromise.then((map) => {

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          maxWidth: '500px',
          anchor: 'left',
        });

        map.on('mouseenter', 'buildings', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const building = e.features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup
            .setLngLat(coordinates)
            .setHTML('<div id="popup-content"></div>')
            .addTo(map);

          const popupContent = defineComponent({
            extends: BuildingPopup,
            setup() {
              return { building };
            },
          });

          nextTick(() => {
            createApp(popupContent).mount('#popup-content');
          });
        });

        map.on('mouseleave', 'buildings', () => {
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
