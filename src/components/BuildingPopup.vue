<template>
  <v-card class="mx-auto cardColor building-popup">
    <v-card-title>
      <h3>{{ building.name }}</h3></v-card-title
    >
    <v-card-text class="d-flex flex-column align-start">
      <v-img :src="building.thumbnail" />
    </v-card-text>
  </v-card>
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
    "more": "ເພີ່ມເຕີມ"
  }
}
</i18n>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BuildingPopup',
  computed: {
    columns() {
      return [
        {
          icon: 'home',
          key: 'number_of_groups',
          label: this.$t('number-of-groups'),
        },
        {
          icon: 'crowd',
          key: 'number_of_members',
          label: this.$t('total_group_members'),
        },
        {
          icon: 'tractor',
          key: 'cultivated_land_area',
          label: this.$t('total_area_cultivated'),
        },
        {
          icon: 'handshake-outline',
          key: 'number_of_businesses',
          label: this.$t('number_of_businesses'),
        },
        {
          icon: 'waves',
          key: 'number_of_irrigation_scheme',
          label: this.$t('number_of_projects'),
        },
      ];
    },
  },
});
</script>

<style>
.building-popup {
  min-height: 190px;
}

.cardColor {
  background-color: rgba(255, 255, 255, 0.9) !important;
  border-color: white !important;
}

.mapboxgl-popup-content {
  background: transparent !important;
}
</style>