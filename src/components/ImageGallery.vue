<template>
  <div class="image-gallery">
    <h1>Pictures </h1>
    <v-carousel v-model="carouselIdx" v-if="mediasList.length">
      <v-carousel-item v-for="(media, idx) in mediasList" :key="idx" eager>
        <div class="carousel-img-container">
          <v-img class="carousel-img" :src="media.src" eager/>
          <div class="mt-2">
            <p>{{ media.caption }}</p>
            <p></p>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>

    <div class="text-center" v-if="mediasList.length">
      <v-dialog v-model="galleryDialog" width="2000" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            tile
            color="secondary"
            v-bind="attrs"
            v-on="on"
            class="ma-4"
          >
            {{ $t('gallery') }}
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon
                class="heading grey--text text--darken-4"
                @click="galleryDialog = false"
                >close</v-icon
              >
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <viewer
              :images="mediasList"
              :options="options"
              @inited="inited"
              class="images clearfix"
            >
              <template #default="scope">
                <img
                  v-for="(image, idx) in scope.images"
                  :src="image.src"
                  :key="idx"
                  :alt="image.title"
                  class="image"
                />
              </template>
            </viewer>
            <v-btn
              color="primary"
              text
              @click="getPictures()"
              v-if="imageCount > mediasList.length"
            >
              {{ $t('more') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div v-else class="no-picture-container">
      <v-img class="no-picture-image" :src="require('@/assets/logo2.jpg')" />
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "laos": "Laos",
    "farmers_group" : "Farmers Group",
    "download" : "Download",
    "upload_image" : "Upload image",
    "upload_video" : "Upload video",
    "gallery" : "Gallery",
    "more": "More",
    "no-pictures": "No pictures",
    "close": "Close"
  },
  "la": {
    "laos": "???????????????????????????",
    "farmers_group" : "??????????????????????????????????????????",
    "download" : "?????????????????????",
    "upload_image" : "??????????????????????????????",
    "upload_video" : "???????????????????????????????????????",
    "gallery" : "??????????????????",
    "more": "???????????????????????????",
    "no-pictures": "?????????????????????????????????",
    "close" : "?????????"
  }
}
</i18n>

<script>
import { defineComponent } from '@vue/composition-api';
import MainService from '@/services/MainService.js';
import router from '@/router';

export default defineComponent({
  data() {
    return {
      bucketPath:
        '',
      imagePage: 0,
      imageCount: 0,
      carouselIdx: 0,
      galleryDialog: false,
      loadingPic: false,
      loadingVid: false,
      nextPictures: [],
      options: {
        title: (image) => image.alt,
        toolbar: {
          prev: true,
          // next: () => {
          //   this.$viewer.next(true);
          //   if (this.$viewer.index === this.mediasList.length - 1) {
          //     this.getPictures();
          //   }
          // },
        },
      },
    };
  },
  props: {
    mediasList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    // carouselIdx(idx) {
    //   if (idx === this.mediasList.length - 1) {
    //     this.getPictures();
    //   }
    // },
  },
  methods: {
    goToAnalytics(granularity, value) {
      window.scrollTo(0, 0);
      router.push({
        name: 'analytics',
        params: { granularity, value, projectType: this.projectType },
      });
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
    async getPictures() {
      // this.imagePage += 1;
      // const result = (
      //   await MainService.getPictures(
      //     this.projectType,
      //     this.granularity,
      //     this.value,
      //     this.imagePage,
      //     this.params,
      //   )
      // ).data.map((x) => ({
      //   src: `${this.bucketPath}/${x.key}`,
      //   title: `${x.project} ${x.caption ?? ''}`,
      //   caption: x.caption,
      //   metadata: x,
      // }));
      // this.mediasList = [...this.mediasList, ...result];
    },
    async countPictures() {
      const result = (
        await MainService.countPictures(
          this.projectType,
          this.granularity,
          this.value,
          this.params,
        )
      ).data;
      if (result.length) {
        this.imageCount = Number(result[0].count);
      }
    },
  },
});
</script>

<style>
.image {
  height: 400px;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}

.viewer-title {
  opacity: 1;
  font-weight: 700;
  font-size: 15px;
}

.v-carousel__controls {
  display: none !important;
}

.carousel-img-container {
  height: 100%;
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}
.carousel-img {
  align-self: center;
  min-height: 410px;
  max-height: 100%;
}

.no-picture-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.no-picture-image {
  opacity: 0.4;
  width: 300px;
}
</style>