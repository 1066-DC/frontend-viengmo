<template>
  <ApexChart
    :width="500"
    :height="200"
    :options="options"
    :series="series"
  ></ApexChart>
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
    labels: {
      type: Array,
      default() {
        return [];
      },
    },
    centerLabel: {
      type: String,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          type: 'donut',
          selection: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
        },
        stroke: {
          width: 0,
        },
        labels: this.labels,
        colors: ['#16A34A', '#FFCC60'],
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return `${formatNumber(val, 0)}%`;
          },
          dropShadow: {
            enabled: false,
          },
          style: {
            colors: ['#000000'],
          },
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: '60%',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: this.centerLabel,
                  fontSize: 10,
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0);
                  },
                },
                value: {
                  show: true,
                  fontWeight: 700,
                  offsetY: 5,
                  fontSize: 30,
                },
              },
            },
          },
        },
        tooltip: {
          enabled: false,
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
        states: {
          active: {
            filter: {
              type: 'none',
            },
          },
          hover: {
            filter: {
              type: 'none',
            },
          },
          normal: {
            filter: {
              type: 'none',
            },
          },
        },
      };
    },
  },
};
</script>

<style>
</style>