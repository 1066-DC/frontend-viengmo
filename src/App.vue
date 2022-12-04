<template>
  <v-app>
    <v-app-bar app color="primary" :height="100" flat class="container mx-auto mb-2">
      <div class="cursor-pointer">
        <v-img
          contain
          class="nav-logo"
          position="left"
          :src="require('@/assets/logo2.jpg')"
          transition="scale-transition"
          @click="goToHome"
        />
      </div>

      <div class="font-sans font-medium text-3xl ma-4 font-bold text-[#D59918]">
        {{ location }}
      </div>
      <v-spacer></v-spacer>
      <v-menu v-if="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed rounded v-bind="attrs" color="transparent" v-on="on">
            <v-img class="pa-2" width="32px" :src="getImgUrl($i18n.locale)" />
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item
            dense
            v-for="lang in langs"
            :key="lang.label"
            @click="$i18n.locale = lang.id"
          >
            <v-list-item-avatar size="16px" style="margine-left: 2px">
              <v-img class="pa-2" rounded :src="getImgUrl(lang.id)" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ lang.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="false"
        :to="{
          name: 'settings',
        }"
      >
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-primary">
      <router-view :buildings="buildings" @location="updateLocation" />
    </v-main>
  </v-app>
</template>

<script>
import router from '@/router';
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
      longitude: x.attributes.longitude,
      latitude: x.attributes.latitude,
      name: x.attributes.name,
      thumbnail: x.attributes.front.data.attributes.formats.thumbnail.url
    }));

    this.buildings.forEach(b => {
      document.createElement('img').setAttribute('src', b.thumbnail);
    })

  },
  methods: {
    goToHome() {
      router.push({
        name: 'home',
      });
    },
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