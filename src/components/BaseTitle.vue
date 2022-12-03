<template>
  <div
    :class="[
      'font-sans',
      subtitle ? 'font-medium' : 'font-bold',
      subtitle ? 'text-2xl' : 'text-3xl',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['subtitle'],
};
</script>

<style>
</style>