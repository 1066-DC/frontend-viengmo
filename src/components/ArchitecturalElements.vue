<template>
  <div class="container mx-auto mt-5 flex">
    
    <div class="w-3/5 flex flex-col gap-10">
      
      <div v-for="ae in architecturalElements.data" v-bind:key="ae.id" class="flex gap-20">
        <v-img
          class="rounded"
          cover
          :max-height="150"
          :height="150"
          :width="150"
          :max-width="150"
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

        <div>
          <h2>{{ ae.attributes.element }}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis tellus, feugiat non mauris vestibulum, condimentum vestibulum mauris. Nam mi mauris, gravida ut laoreet eget, tempor a mi. Vestibulum est arcu, luctus rhoncus faucibus et, mattis ac orci.</p>
            <div v-if="ae.attributes.buildings">
              <span class="font-small">Buildings:</span>
                <v-btn
                  v-for="building in  ae.attributes.buildings.data"
                  v-bind:key="building.id"
                  :href="'/buildings/'+building.id"
                  depressed text
                  color="info"
                >
                {{ building.attributes.name }}
              </v-btn>
            </div>
        </div>

      </div>

    </div>

    <div class="w-2/5 px-10">
      <BaseTitle class="mb-3"> Architectural elements </BaseTitle>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis tellus, feugiat non mauris vestibulum, condimentum vestibulum mauris. Nam mi mauris, gravida ut laoreet eget, tempor a mi. Vestibulum est arcu, luctus rhoncus faucibus et, mattis ac orci. Sed ac ornare risus, vitae commodo urna. Morbi vitae odio non metus elementum euismod ac sit amet eros. Proin ut ex tortor. Nulla ullamcorper fringilla maximus. In aliquet pulvinar feugiat. Vivamus in facilisis lacus, vel tristique est. Praesent dignissim nisl enim, ac accumsan tellus congue ac. Curabitur consequat id mauris ut hendrerit. Sed sed erat tempus, tristique sapien non, laoreet elit. Vivamus ex massa, gravida sit amet feugiat id, gravida vitae augue. Nunc varius quam ut ornare auctor. Suspendisse potenti.

        Morbi hendrerit enim non lobortis mollis. Nulla sem eros, faucibus sed mollis eget, finibus ut nulla. Aliquam erat volutpat. Nulla ac odio sit amet dui finibus tempor at eu diam. Morbi sed metus elementum, tristique nisl et, aliquet enim. Donec ut felis turpis. Donec orci mauris, fringilla ut fringilla non, fringilla vel dolor. 
      </div>
    </div>

  </div>
</template>

<script>
import MainService from '@/services/MainService.js';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ArchitecturalElements',
  data() {
    return {
      architecturalElements: {},
    };
  },
  async mounted() {
    this.architecturalElements = (await MainService.getArchitecturalElements()).data
    console.log(this.architecturalElements)
  },
});
</script>

<style>
#map {
  height: 100%;
  width: 100%;
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
