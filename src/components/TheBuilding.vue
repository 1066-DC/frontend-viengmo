<template>
  <div class="container mx-auto max-w-screen-xl my-5 flex">
    <div class="w-3/5">
      <ImageGallery :medias-list="mediasList" />
      <div class="mt-5" v-if="bibliographicReferences">
        <h2>Bibliographic References</h2> 
        <ul>
          <li class="list-disc" v-for="br in bibliographicReferences" v-bind:key="br.id">
            <span class="font-medium">{{br.attributes.title}}</span>&nbsp;
            <span v-if="br.attributes.description" >{{br.attributes.description}}</span> 
            <span v-if="br.attributes.quote" >{{br.attributes.quote}}</span> 
            <span v-if="br.attributes.website" >{{br.attributes.website}}</span> 
          </li>
        </ul>
      </div>

    </div>
    <div class="w-2/5 px-10">
      <v-skeleton-loader v-if="!name"  color="#F7F7F7" class="skeleton-article " type="article@4"></v-skeleton-loader>
      <div v-else>
        
        <h2 class="mb-3 text-4xl">{{ name }} </h2>
        
        <vue-markdown :source="description"></vue-markdown>
        
        <hr v-if="description">
        
        <div class="mt-10"> 
          
          <div v-if="yearOfCompletion">
            <h2>Year</h2>
            <span>{{ yearOfCompletion }}</span>
          </div>

          <div class="mt-5" v-if="surfaceBuilding">
            <h2>Surface Building</h2>
            {{surfaceBuilding}}
          </div>
          
          <div class="mt-5" v-if="usageStatus">
            <h2>Current Status</h2>
            <span>{{ usageStatus }}</span>
          </div>

          <div class="mt-5" v-if="currentOwner">
            <h2>Current Owner</h2>
            <span class="font-medium">{{currentOwner.name}}</span>&nbsp;
            <span>{{currentOwner.description}}</span> 
          </div>
          

          <div class="mt-5" v-if="constructionCompagnies">
            <h2>Construction Compagnies</h2>
            <ul>
              <li class="list-disc" v-for="cs in constructionCompagnies" v-bind:key="cs.id">
                <span class="font-medium">{{cs.attributes.name}}</span>&nbsp;
                <span>{{cs.attributes.description}}</span> 
              </li>
            </ul>
          </div>

          <div class="mt-5" v-if="architect">
            <h2>Architect</h2>
            <ul>
              <li class="list-disc" v-for="a in architect" v-bind:key="a.id">
                <span class="font-medium">{{a.attributes.name}}</span>&nbsp;
                <span>{{a.attributes.description}}</span> 
              </li>
            </ul>
          </div>

          <div class="mt-5" v-if="architecturalElements">
            <router-link to="/architectural-elements/">
              <h2 class="text-black">Architectural Elements</h2>
            <div class="flex flex-wrap gap-y-5 gap-x-16 py-5">
              <div class="flex flex-col" v-for="ae in architecturalElements" v-bind:key="ae.id"> 
                <div class="rounded">
                  <v-img
                    :width="50"
                    :height="50"
                    class="rounded"
                    aspect-ratio="1/1"
                    cover
                    :src="ae.attributes.picture_example.data.attributes.formats.thumbnail.url"
                  >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                      ></v-progress-circular>
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
          <div id="map" class="w-full h-96" ></div>
        </div>
      </div>

    </div>
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
      return this.building.data ? this.building.data?.attributes?.medias?.data.map( x => ({
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
      if (this.building.data?.attributes?.architect.data.length == 0)
        return ""
      else 
        return this.building.data?.attributes?.architect.data
    },
    constructionCompagnies() {
      if (this.building.data?.attributes?.construction_compagnies.data.length == 0)
        return ""
      else 
        return this.building.data?.attributes?.construction_compagnies.data
    },
    bibliographicReferences() {
      if (this.building.data?.attributes?.bibliographic_references.data.length == 0)
        return ""
      else 
        return this.building.data?.attributes?.bibliographic_references.data
    },
    buildingGroups() {
      if (this.building.data?.attributes?.building_groups.data.length == 0)
        return ""
      else 
        return this.building.data?.attributes?.building_groups.data
    },
    historyEvents() {
      if (this.building.data?.attributes?.history_events.length == 0)
        return ""
      else 
        return this.building.data?.attributes?.history_events.data
    },
    architecturalElements() {
      if (this.building.data?.attributes?.architectural_elements.data.length == 0)
        return ""
      else 
        return this.building.data?.attributes?.architectural_elements.data
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
  height: 100%;
  width: 100%;
}

h2 {
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
