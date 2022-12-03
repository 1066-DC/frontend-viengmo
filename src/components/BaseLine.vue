<template>
  <ApexChart
    :width="600"
    :height="300"
    :options="options"
    :series="internalSeries"
  ></ApexChart>
</template>

<script>
import { formatNumber } from '@/helpers';

export default {
  name: 'BaseLine',
  props: {
    series: {
      type: Array,
      default() {
        return [];
      },
    },
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    internalSeries() {
      return this.series.map((x) => ({
        ...x,
        data: [{ x: ' ', y: null }, ...x.data, { x: '  ', y: null }],
      }));
    },
    options() {
      return {
        chart: {
          type: 'line',
          toolbar: {
            show: false,
          },
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
        colors: ['#16A34A', '#FFCC60'],
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
        dataLabels: {
          enabled: true,
          formatter: (v) => formatNumber(v, 0) ?? '',
          offsetY: -5,
        },
        legend: {
          fontWeight: 700,
          position: 'right',
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
        markers: {
          size: 5,
          shape: 'square',
          showNullDataPoints: false,
          strokeWidth: 0,
          colors: ['#16A34A', '#FFCC60'],
        },
        tooltip: {
          enabled: false,
        },
        yaxis: {
          min: 0,
          max:
            Math.max(
              ...this.series.map((x) => x.data.map((x) => x?.y || 0)).flat(),
            ) * 1.2,
          labels: {
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