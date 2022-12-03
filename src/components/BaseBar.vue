<template>
  <div>
    <div class="flex justify-space-between align-center">
      <BaseTitle :subtitle="true">{{ title }}</BaseTitle>
      <div>
        <v-btn icon @click="downloadPng">
          <v-icon>mdi-image</v-icon>
        </v-btn>
        <v-btn icon @click="downloadCsv">
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="font-medium">{{ this.groupType }} ({{ unit }})</div>

    <ApexChart
      v-if="!empty"
      ref="demoChart"
      :height="height"
      :options="options"
      :series="series"
    ></ApexChart>
  </div>
</template>

<script>
import { formatNumber } from '@/helpers';

export default {
  props: {
    series: {
      type: Array,
      default() {
        return [];
      },
    },
    height: {
      type: Number,
      default: 300,
    },
    gauge: {
      type: Boolean,
      default: false,
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      default: false,
    },
    legendBottom: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    unit: {
      type: String,
    },
    title: {
      type: String,
    },
    groupType: {
      type: String,
    },
  },
  methods: {
    downloadPng() {
      const cts = this.$refs.demoChart.chart.ctx;
      cts.w.globals.chartID = `${this.value}_${this.title.replaceAll(
        ' ',
        '_',
      )}`;
      cts.exports.exportToPng();
    },
    downloadCsv() {
      const cts = this.$refs.demoChart.chart.ctx;
      cts.w.globals.chartID = `${this.value}_${this.title.replaceAll(
        ' ',
        '_',
      )}`;
      cts.exports.exportToCSV({
        series: cts.w.config.series,
        columnDelimiter: ',',
      });
    },
  },
  computed: {
    options() {
      return {
        chart: {
          toolbar: {
            show: false,
          },
          type: 'bar',
          width: '100%',
          stacked: this.stacked,
          selection: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
        },
        grid: {
          show: false,
        },
        colors: this.gauge ? ['#16A34A', '#D9D9D9'] : ['#FFCC60', '#16A34A'],
        xaxis: {
          type: 'category',
          axisBorder: {
            show: true,
            color: '#000000',
          },
          axisTicks: {
            show: true,
            color: '#000000',
            offsetY: -3,
            height: 6,
          },
        },
        legend: {
          fontWeight: 700,
          position: this.legendBottom ? 'bottom' : 'right',
          markers: {
            radius: 0,
          },
          onItemClick: {
            toggleDataSeries: false,
          },
          onItemHover: {
            highlightDataSeries: false,
          },
        },

        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000000'],
          },
          formatter: (v) => formatNumber(v, 0) ?? '',
        },
        tooltip: {
          enabled: false,
        },
        yaxis: {
          titles: {
            formatter: (v) => formatNumber(v, 0),
          },
        },
      };
    },
  },
};
</script>

<style>
</style>