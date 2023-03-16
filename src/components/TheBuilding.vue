<template>
  <div :class="['container', 'mx-auto', 'max-w-screen-xl', 'my-5', 'flex', mobileView ? 'flex-column-reverse' : '']">
    <div :class="[mobileView ? '' : 'w-3/5', 'pa-10']">
      <ImageGallery :medias-list="mediasList" />
      <TitleValue type="bibliographicReferences" title="Bibliographic References" :value="bibliographicReferences" />

    </div>
    <div :class="[mobileView ? '' : 'w-2/5', 'px-10']">
      <v-skeleton-loader v-if="!name" color="#F7F7F7" class="skeleton-article " type="article@4"></v-skeleton-loader>
      <div v-else>

        <div class="flex items-center mb-3">
          <h1 class="text-4xl font-bold">{{ name }}</h1>
          <span class="mx-5 font-normal text-red-700" v-if="useFunction">{{ useFunction }}</span>
        </div>
        <BaseBox class="flex flex-1 align-center justify-space-around">
          <v-skeleton-loader v-if="!profileSource" class="skeleton-article" type="image"></v-skeleton-loader>
          <v-img :src="profileSource" :max-width="profileWidth" :min-width="profileWidth" :max-height="profileHeight"
            :min-height="profileHeight" />
        </BaseBox>
        <vue-markdown :source="description"></vue-markdown>

        <hr v-if="description">

        <div class="mt-10">

          <TitleValue type="uniqueValue" title="Year of Completion" :value="yearOfCompletion" />
          <TitleValue type="uniqueValue" title="Surface Building" :value="surfaceBuilding" />
          <TitleValue type="uniqueValue" title="Usage Status" :value="usageStatus" />
          <TitleValue type="actor" title="Current Owner" :value="currentOwner" />
          <TitleValue type="actors" title="Construction Companies" :value="constructionCompanies" />
          <TitleValue type="actors" title="Architects" :value="architect" />


          <div class="mt-5" v-if="architecturalElements">
            <router-link to="/architectural-elements/">
              <h2 class="text-black">Architectural Elements</h2>
              <div class="flex flex-wrap gap-y-5 gap-x-16 py-5">
                <div class="flex flex-col" v-for="ae in architecturalElements" v-bind:key="ae.id">
                  <div class="rounded">
                    <v-img :width="50" :height="50" class="rounded" aspect-ratio="1/1" cover
                      :src="ae.attributes.picture_example.data.attributes.formats.thumbnail.url">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </div>
                  <div class="text-sm pt-1 text-black">{{ ae.attributes.element }}</div>
                </div>
              </div>
            </router-link>
          </div>

        </div>
      </div>

      <div class="mt-5">
        <h2> Location </h2>
        <div class="flex align-start justify-space-around w-full h-96">
          <div id="map" class="w-full h-96"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import MainService from '@/services/MainService.js';
import { useMap } from '@/hooks/useMap.js';
import { formatNumber, getChildProperties } from '@/helpers';
import { defineComponent, toRef } from '@vue/composition-api';
import ImageGallery from '@/components/ImageGallery.vue';
import TitleValue from '@/components/TitleValue.vue';

export default defineComponent({
  name: 'TheBuilding',
  components: {
    ImageGallery,
    TitleValue,
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
    mobileView() {
      return this.window.width < 1344;
    },
    profileSource() {
      return this.building.data?.attributes?.front?.data?.attributes?.formats?.thumbnail?.url ?? '';
    },
    profileWidth() {
      return this.building.data?.attributes?.front?.data?.attributes?.formats?.thumbnail?.width ?? '';
    },
    profileHeight() {
      return this.building.data?.attributes?.front?.data?.attributes?.formats?.thumbnail?.height ?? '';
    },
    mediasList() {
      return this.building.data ? this.building.data?.attributes?.medias?.data.map(x => ({
        src: x.attributes?.formats?.medium?.url
      })) : [];
    },
    description() {
      return this.building.data ? this.building.data?.attributes?.description : "";
    },
    name() {
      return this.building.data ? this.building.data?.attributes?.name : "";
    },
    usageStatus() {
      return this.building.data ? this.building.data?.attributes?.usage_status?.data?.attributes?.status : "";
    },
    useFunction() {
      return this.building.data ? this.building.data?.attributes?.use_function?.data?.attributes?.function : "";
    },
    currentOwner() {
      return this.building.data ? this.building.data?.attributes?.current_owner?.data?.attributes : "";
    },
    surfaceBuilding() {
      return this.building.data ? this.building.data?.attributes?.surface_building?.data : "";
    },
    yearOfCompletion() {
      return this.building.data ? this.building.data?.attributes?.year_of_completion : "";
    },
    architect() {
      return this.getBuildingChildProperties("architect");
    },
    constructionCompanies() {
      return this.getBuildingChildProperties("construction_companies");
    },
    bibliographicReferences() {
      return this.getBuildingChildProperties("bibliographic_references");
    },
    buildingGroups() {
      return this.getBuildingChildProperties("building_groups");
    },
    historyEvents() {
      return this.getBuildingChildProperties("history_events");
    },
    architecturalElements() {
      return this.getBuildingChildProperties("architectural_elements");
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
    getBuildingChildProperties(key) {
      return getChildProperties(this.building, key);
    }
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
        this.building = {};
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
  height: 100%;
  width: 100%;
}

.skeleton-article {
  height: 600px;
  width: 400px;
}
</style>
