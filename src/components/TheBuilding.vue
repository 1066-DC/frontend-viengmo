<template>
  <div>
    <BaseBox class="flex flex-column bg-white">
      <div class="flex flex-column">
        <BaseTitle class="ml-2">{{ $t('general') }} </BaseTitle>
        <BaseBox class="flex bg-neutral-200 align-start">
          <div>
            <v-img :src="profileSource" />
          </div>
          <div id="map"></div>
        </BaseBox>
      </div>
    </BaseBox>
    <BaseBox class="flex flex-column bg-white">
    <vue-markdown :source="description"></vue-markdown>

    </BaseBox>
    <BaseBox :class="[
      'bg-neutral-200',
      'flex-1',
      'flex',
      'flex-column',
      'justify-space-around',
    ]">
      <ImageGallery :medias-list="mediasList"/>
    </BaseBox>
  </div>
</template>

<i18n>
{
  "en": {
    "project": "Project",
    "general": "General",
    "farmers_group" : "Farmers Group",
    "download" : "Download",
    "total_groups" : "Total groups",
    "total_members" : "Total members",
    "total_land_area_ha" : "Total land area (ha)",
    "total_family_members" : "Total family members",
    "upload_image" : "Upload image",
    "upload_video" : "Upload video",
    "gallery" : "Gallery",
    "more": "More",
    "close": "Close",
    "members" : "Members",
    "production_yields" : "Production yields (kg/ha)",
    "average_fertilizer_use": "Average fertilizer use (kg)",
    "average_sales_price": "Average sales price (LAK/kg)",
    "rice_production_sold": "Rice production sold (kg)",
    "melon-soybean_production_sold":"Melon/soybean production sold (kg)",
    "see_more" : "See more"
  },
  "la": {
    "project": "ໂຄງການ",
    "general": "ພາບລວມ",
    "farmers_group" : "ກຸ່ມຊາວກະສິກອນ",
    "download" : "ດາວໂຫຼດ",
    "total_groups" : "ກຸ່ມ​ທັງ​ຫມົດ​",
    "total_members" : "ສະມາຊິກທັງໝົດ",
    "total_land_area_ha" : "ເນື້ອທີ່ດິນທັງໝົດ (ha)",
    "total_family_members" : "ສະມາຊິກຄອບຄົວທັງຫມົດ",
    "upload_image" : "ອັບໂຫຼດຮູບ",
    "upload_video" : "ອັບໂຫລດວິດີໂອ",
    "gallery" : "ຄັງຮູບ",
    "more": "ເພີ່ມເຕີມ",
    "close" : "ໃກ້",
    "members" : "ສະມາຊິກ",
    "production_yields": "ຜົນຜະລິດ (kg/ha)",
    "average_fertilizer_use": "ການນໍາໃຊ້ຝຸ່ນສະເລ່ຍ (kg)",
    "average_sales_price": "ລາຄາຂາຍສະເລ່ຍ (LAK/kg)",
    "rice_production_sold": "ການຜະລິດເຂົ້າຂາຍ (kg)",
    "melon-soybean_production_sold": "ການຜະລິດຫມາກໂມ / ຖົ່ວເຫຼືອງແມ່ນຂາຍ (kg)",
    "see_more": "ເບິ່ງເພີ່ມເຕີມ"
  }
}
</i18n>

<script>
import MainService from '@/services/MainService.js';
import { useMap } from '@/hooks/useMap.js';
import { formatNumber } from '@/helpers';
import { defineComponent, toRef } from '@vue/composition-api';
import ImageGallery from '@/components/ImageGallery.vue';

export default defineComponent({
  name: 'TheBuilding',
  components: {
    ImageGallery,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      building: {},
    };
  },
  props: {
    id: {
      type: String,
    },
    buildings: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    profileSource() {
      return this.building.data ? this.building.data.attributes.profile.data.attributes.file.data.attributes.formats.small.url : ''; 
    },
    mediasList() {
      return this.building.data ? this.building.data.attributes.medias.data.map( x => ({
        src: x.attributes.formats.large.url
      })) : []; 
    },
    description() {
      return this.building.data ? this.building.data.attributes.description : "";
    }
  },
  created() {
    window.addEventListener('resize', this.onWindowsResize);
    this.onWindowsResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.onWindowsResize);
  },
  methods: {
    onWindowsResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    formatNumber,
  },

  setup(props) {
    const { mapPromise } = useMap(
      toRef(props, 'buildings'),
      toRef(props, 'id'),
      12,
    );

    return {
      mapPromise,
    };
  },
  watch: {
    id: {
      async handler() {
        this.building = (
          await MainService.getBuilding(
            this.id
          )
        ).data;
      },
      immediate: true,
    },
  },
});
</script>

<style>
#map {
  height: 450px;
  width: 450px;
}
</style>
