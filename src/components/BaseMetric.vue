<template>
  <div class="flex flex-column pa-2" :class="{ 'align-center': !title }">
    <div class="font-sans font-normal text-sm">
      {{ label | capitalizeFirst }}
    </div>
    <div class="font-sans font-bold text-3xl flex flex-initial align-center">
      <BaseIcon v-if="icon" :icon="icon" class="mr-2" /><span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
import { capitalizeFirst } from '@/helpers';
export default {
  filters: {
    capitalizeFirst,
  },
  props: {
    label: {
      type: String,
    },
    value: {
      type: [String, Number],
    },
    icon: {
      type: String,
    },
    title: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>