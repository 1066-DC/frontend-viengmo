<template>
  <Icon :icon="`mdi:${icon}`" />
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  components: {
    Icon,
  },
  props: ['icon'],
};
</script>

<style>
</style>