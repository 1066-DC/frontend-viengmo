<template>
  <button
    :class="[
      'px-2',
      light
        ? `
      outline ${lightNoBorder ? 'outline-0' : 'outline-2'} outline-green-600
      text-green-600
      rounded-md
      bg-transparent
      h-8
      hover:bg-green-600 hover:text-white`
        : `
      border
      bg-green-600
      rounded-md
      h-10
      text-white
      hover:outline-2 hover:outline hover:outline-black
      `,
      small ? 'text-sm h-6' : '',
      icon ? 'mr-2' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <span><slot></slot></span>
    <v-icon v-if="icon" class="text-green-600" color="green"
      >mdi-{{ icon }}</v-icon
    >
  </button>
</template>

<script>
export default {
  props: ['icon', 'light', 'small', 'lightNoBorder'],
};
</script>

<style>
</style>