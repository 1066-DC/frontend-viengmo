<template>
  <v-app class=" max-w-screen-xl mx-auto bg-primary">
    <v-app-bar :height="150" flat class="container v-toolbar__content">
        <router-link to="/">
          <v-img
            contain
            class="nav-logo cursor-pointer"
            position="left"
            :src="require('@/assets/viengmo-logo.jpeg')"
            transition="scale-transition"
          />
        </router-link>


      <v-spacer></v-spacer>
     
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed tile
            color="secondary"
            v-bind="attrs"
            class="mx-5"
            v-on="on"
            >
            Buildings
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(b, index) in buildings"
            :key="index"
            :href="'/buildings/'+b.id"
          >
            <v-list-item-title>{{ b.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn 
        class="mx-5"
        color="secondary" 
        depressed tile
        href="/architectural-elements/"
      >
        Architectural Elements
      </v-btn>


    </v-app-bar>

    <v-main class="bg-primary">
      <router-view :buildings="buildings" @location="updateLocation" />
    </v-main>
  </v-app>
</template>

<script>
import MainService from '@/services/MainService.js';

export default {
  name: 'App',
  data() {
    return {
      buildings: [],
      location: '',
      langs: [
        { label: 'english', id: 'en' },
        { label: 'ລາວ', id: 'la' },
      ],
    };
  },
  async mounted() {
    this.buildings = (await MainService.getBuildingLocations()).data.data.map(x => ({
      id: x.id,
      longitude: x.attributes.location ? JSON.parse(x.attributes.location).lng: '',
      latitude: x.attributes.location ? JSON.parse(x.attributes.location).lat : '',
      name: x.attributes.name,
      thumbnail: x.attributes.front.data?.attributes.formats.thumbnail.url
    }));

    this.buildings.forEach(b => {
      document.createElement('img').setAttribute('src', b.thumbnail);
    })

  },
  methods: {
    updateLocation(location) {
      this.location = location;
    },
    getImgUrl: (country) => {
      var images = require.context('@/assets/flags/', false, /\.png$/);
      return images('./' + country + '64.png');
    },
  },
};
</script>

<style>
.v-toolbar__content {
  padding: 0px !important;
}

.nav-logo {
  height: 100px;
}
</style>