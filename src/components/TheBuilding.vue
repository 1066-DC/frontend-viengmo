<template>
  <div class="container mx-auto">
    <BaseBox class="flex flex-column bg-white border-b-2 border-grey-200">
      <div class="flex flex-column">
        <BaseTitle>{{ name }} </BaseTitle>
        <div class="flex">
          <BaseBox class="flex flex-1 align-start">
            <v-skeleton-loader v-if="!description"  class="skeleton-article" type="article@4"></v-skeleton-loader>
            <vue-markdown velse :source="description"></vue-markdown>
          </BaseBox>
          <BaseBox class="flex flex-1 align-center justify-space-around">
            <v-skeleton-loader v-if="!profileSource"  class="skeleton-article" type="image"></v-skeleton-loader>
            <v-img :src="profileSource" :max-width="profileWidth" :min-width="profileWidth" :max-height="profileHeight" :min-height="profileHeight"/>
          </BaseBox>
        </div>
      </div>
    </BaseBox>
    <BaseBox class="flex bg-white">
      <BaseBox class="flex flex-1 align-start flex-column">
        <h1>Localisation </h1>
        <div class="flex align-start justify-space-around">
          <div id="map"></div>
        </div>
      </BaseBox>
      <BaseBox class="flex flex-1 align-center justify-space-around">
        <ImageGallery :medias-list="mediasList" />
      </BaseBox>
    </BaseBox>

  </div>
</template>

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
      return this.building.data?.attributes?.front?.data?.attributes?.formats?.small?.url ?? '' ; 
    },
    profileWidth() {
      return this.building.data?.attributes?.front?.data?.attributes?.formats?.small?.width ?? '';  
    },
    profileHeight() {
      return this.building.data?.attributes?.front?.data?.attributes?.formats?.small?.height ?? '';  
    },
    mediasList() {
      return this.building.data ? this.building.data.attributes.medias.data.map( x => ({
        src: x.attributes.formats.medium.url
      })) : []; 
    },
    description() {
      return this.building.data ? this.building.data.attributes.description : "";
    },
    name() {
      return this.building.data ? this.building.data.attributes.name : "";
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
        this.building = {}
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

h1 {
  font-weight: 600;
}

h2 {
  font-weight: 500;
}

.skeleton-article {
  height: 600px;
  width: 400px;
}

</style>
