<template>
  <v-img :src="src" @error="emitError()" />
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitError() {
      this.$emit('error');
    },
  },
};
</script>

<style scoped></style>
