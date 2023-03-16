<template>
  <div class="mt-5" v-if="value">
    <h2 class="font-semibold">{{title}}</h2>
    
    <ul v-if="type=='actors'">
      <li class="list-disc" v-for="actor in value" v-bind:key="actor.id">
        <span class="font-medium">{{actor.attributes.name}}</span>&nbsp;
        <span>{{actor.attributes.description}}</span> 
      </li>
    </ul>

    <div v-else-if="type=='actor'">
      <span class="font-medium">{{value.name}}</span>&nbsp;
      <span>{{value.description}}</span> 
    </div>
    
    <span v-else-if="type=='bibliographicReferences'">
      <ul>
        <li class="list-disc" v-for="br in value" v-bind:key="br.id">
          <span class="font-medium">{{br.attributes.title}}</span>&nbsp;
          <span v-if="br.attributes.description" >{{br.attributes.description}}</span> 
          <span v-if="br.attributes.quote" >{{br.attributes.quote}}</span> 
          <span v-if="br.attributes.website" >{{br.attributes.website}}</span> 
        </li>
        </ul>
    </span>
    
    <span v-else-if="type=='uniqueValue'">{{value}}</span>

  </div>
</template>

<script>
export default {
  name: 'TitleValue',
  data() {
    return {};
  },
  props: {
    type: String,
    title: {
      type: String,
    },
    value: {
      type: [Array, String, Object]
    },
  }
};
</script>

<style>

</style>
