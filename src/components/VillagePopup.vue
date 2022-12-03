<template>
  <v-card class="mx-auto cardColor">
    <v-card-title>
      <h3>{{ village.name_en }}/{{ village.name_la }}</h3></v-card-title
    >
    <v-card-subtitle>
      <h4>
        {{ village.district_name_en }}
      </h4>
      <h4>
        {{ village.province_name_en }}
      </h4>
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column align-start">
      <div
        class="mr-2 flex align-center text-lg"
        v-for="col in columns"
        :key="col.key"
      >
        <BaseIcon :icon="col.icon" class="mr-2" />
        <span class="font-weight-bold mr-2">{{ col.label }}</span>
        <span class="font-weight-bold">{{ village[col.key] }}</span>
      </div>
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
  name: 'VillagePopup',
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
.cardColor {
  background-color: rgba(255, 255, 255, 0.9) !important;
  border-color: white !important;
}

.mapboxgl-popup-content {
  background: transparent !important;
}
</style>