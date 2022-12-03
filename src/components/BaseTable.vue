<template>
  <div class="flex flex-col px-6 py-3 rounded-md">
    <table class="divide-y divide-black">
      <thead class="divide-y divide-black">
        <tr>
          <th
            v-for="header in columns"
            :key="header.key"
            scope="col"
            class="px-6 py-3 font-sans text-center text-xs font-medium italic"
          >
            {{ header.label }}
          </th>
          <th class="flex align-start">
            <download-csv :data="rows"
              ><v-btn icon><v-icon>mdi-download</v-icon></v-btn></download-csv
            >
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="(row, idx) in rows" :key="idx">
          <td
            v-for="header in columns"
            :key="header.key"
            class="px-6 py-2 font-sans font-normal text-center text-xs"
          >
            {{ row[header.key] }}
          </td>
          <td v-if="showGoTo">
            <BaseButton
              icon="arrow-right-bold"
              :light="true"
              :small="true"
              :light-no-border="true"
              @click="goTo(row.project_type, row.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from '@/router';

export default {
  props: {
    columns: {
      type: Array,
    },
    rows: {
      type: Array,
    },
    showGoTo: {
      type: Boolean,
    },
  },
  methods: {
    downloadCsv() {
      console.log('hello');
    },
    goTo(projectType, value) {
      router.push({
        name: 'analytics',
        params: {
          granularity: 'project',
          value,
          projectType,
        },
      });
    },
  },
};
</script>

<style>
</style>