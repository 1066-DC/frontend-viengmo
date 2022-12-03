<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <MapView
        class="ma-2 pa-1"
        :villages="villages"
        :granularity="granularity"
        :value="value"
        :provinces="provincesList"
        :districts="districtsList"
      />
      <BaseBox class="flex flex-column bg-white">
        <div class="flex justify-between">
          <BaseTitle>{{ $t('projects_list') }}</BaseTitle>
        </div>
        <div class="flex mt-4">
          <v-text-field :label="$t('name')" v-model="name"></v-text-field>
          <v-select
            class="mx-2 h-14"
            :label="$t('province')"
            :items="provincesList"
            item-value="id"
            item-text="name_en"
            v-model="selectedProvince"
            clearable
            outlined
          ></v-select>
          <v-select
            class="mx-2 h-14"
            :label="$t('district')"
            :items="districtsList"
            item-value="id"
            item-text="name_en"
            v-model="selectedDistrict"
            clearable
            outlined
          ></v-select>
          <v-select
            class="mx-2 h-14"
            :label="$t('village')"
            :items="villagesList"
            item-value="id"
            item-text="name_en"
            v-model="selectedVillage"
            clearable
            outlined
          ></v-select>
          <v-select
            class="mx-2 h-14"
            :label="$t('project-type')"
            :items="projectTypes"
            v-model="selectedProjectType"
            item-value="key"
            item-text="label"
            clearable
            outlined
          ></v-select>
        </div>
        <BaseTable
          class="bg-neutral-200 mt-4"
          :rows="projects"
          :columns="projectColumns"
          :show-go-to="true"
        />
        <BaseButton @click="loadMore">{{ $t('more') }}</BaseButton>
      </BaseBox>
    </div>
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
import MapView from '@/components/MapView.vue';
import MainService from '@/services/MainService.js';
import router from '@/router';

export default {
  name: 'TheHome',
  components: {
    MapView,
  },
  props: {
    granularity: {
      type: String,
    },
    value: {
      type: String,
    },
    villages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      mapView: true,
      provincesList: [],
      projects: [],
      page: 1,
      type: 'all',
      name: '',
      selectedProvince: null,
      selectedDistrict: null,
      selectedVillage: null,
      selectedProjectType: null,
    };
  },
  computed: {
    label() {
      return this.$i18n.locale === 'la' ? 'name_la' : 'name_en';
    },
    projectColumns() {
      return [
        {
          key: 'id',
          label: this.$t('name'),
        },
        {
          key: 'project_type',
          label: this.$t('project-type'),
        },
        {
          key: `province_${this.label}`,
          label: this.$t('province'),
        },
        {
          key: `district_${this.label}`,
          label: this.$t('district'),
        },
        {
          key: `village_${this.label}`,
          label: this.$t('village'),
        },
      ];
    },
    districtsList() {
      const districts = this.provincesList
        .map((x) => x.Districts)
        .flat()
        .sort((a, b) => a.name_en.localeCompare(b.name_en));
      if (this.selectedProvince) {
        return districts.filter(
          (x) => String(x.province_id) === this.selectedProvince,
        );
      }
      return districts;
    },
    villagesList() {
      const villages = this.districtsList
        .map((x) => x.Villages)
        .flat()
        .sort((a, b) => a.name_en.localeCompare(b.name_en));
      if (this.selectedDistrict) {
        return villages.filter(
          (x) => String(x.district_id) === this.selectedDistrict,
        );
      }
      return villages;
    },
    projectTypes() {
      return [
        {
          key: 'farmer-group',
          label: 'Farmer group',
        },
        {
          key: 'agri-business',
          label: 'Agri-business',
        },
        {
          key: 'irrigation-scheme',
          label: 'Irrigation scheme',
        },
      ];
    },
    location() {
      if (this.selectedVillage !== null) {
        return {
          granularity: 'village',
          value: this.selectedVillage,
        };
      }
      if (this.selectedDistrict !== null) {
        return {
          granularity: 'district',
          value: this.selectedDistrict,
        };
      }
      if (this.selectedProvince !== null) {
        return {
          granularity: 'province',
          value: this.selectedProvince,
        };
      }
      return {
        granularity: 'country',
        value: 'laos',
      };
    },
    queryParams() {
      return `${this.location.granularity}-${this.location.value}-${this.selectedProjectType}-${this.name}`;
    },
  },
  watch: {
    location(location) {
      router
        .push({
          params: { granularity: location.granularity, value: location.value },
        })
        .catch(() => {});
    },
    value() {
      if (this.granularity === 'country') {
        this.selectedProvince = null;
      }
      if (this.granularity === 'province') {
        this.selectedProvince = this.value;
        this.selectedDistrict = null;
        this.selectedVillage = null;
      }
      if (this.granularity === 'district') {
        this.selectedDistrict = this.value;
      }
    },
    queryParams: {
      handler() {
        this.page = 1;
        this.getProjects();
      },
    },
  },
  methods: {
    async getProjects() {
      const payload = (
        await MainService.getProjects(
          this.selectedProjectType,
          this.location.granularity,
          this.location.value,
          this.name,
          this.page,
        )
      ).data;
      if (this.page === 1) {
        this.projects = payload;
      } else {
        this.projects = [...this.projects, ...payload];
      }
    },
    loadMore() {
      this.page = this.page + 1;
      this.getProjects();
    },
  },
  async mounted() {
    this.$emit('location', '');
    this.provincesList = (await MainService.getProvinces()).data.sort((a, b) =>
      a.name_en.localeCompare(b.name_en),
    );
    this.getProjects();
  },
};
</script>

<style scoped>
#map {
  height: 800px;
}
</style>
