<template>
  <div>
    <v-text-field :width="100" label="Period" v-model="period"></v-text-field>
    <UploadButton
      title="Registration form"
      @file-update="uploadFile"
      :data="{ type: 'farmers' }"
      small
      color="secondary"
      class="ma-2"
      :loading="farmerLoading"
    >
      <template slot="icon-left">
        <v-icon left dark>mdi-arrow-up-bold-box-outline</v-icon>
      </template>
    </UploadButton>
    <UploadButton
      title="Aggregated metrics"
      @file-update="uploadFile"
      :data="{ type: 'metrics' }"
      small
      color="secondary"
      class="ma-2"
      :loading="metricsLoading"
    >
      <template slot="icon-left">
        <v-icon left dark>mdi-arrow-up-bold-box-outline</v-icon>
      </template>
    </UploadButton>
    <UploadButton
      title="Irrigation schemes"
      @file-update="uploadFile"
      :data="{ type: 'irrigation' }"
      small
      color="secondary"
      class="ma-2"
      :loading="irrigationLoading"
    >
      <template slot="icon-left">
        <v-icon left dark>mdi-arrow-up-bold-box-outline</v-icon>
      </template>
    </UploadButton>
    <UploadButton
      title="Agri-businesses"
      @file-update="uploadFile"
      :data="{ type: 'businesses' }"
      small
      color="secondary"
      class="ma-2"
      :loading="businessesLoading"
    >
      <template slot="icon-left">
        <v-icon left dark>mdi-arrow-up-bold-box-outline</v-icon>
      </template>
    </UploadButton>
    <UploadButton
      title="Factors"
      @file-update="uploadFile"
      :data="{ type: 'factors' }"
      small
      color="secondary"
      class="ma-2"
      :loading="factorLoading"
    >
      <template slot="icon-left">
        <v-icon left dark>mdi-arrow-up-bold-box-outline</v-icon>
      </template>
    </UploadButton>
    <UploadButton
      title="Member metrics"
      @file-update="uploadFile"
      :data="{ type: 'member-metrics' }"
      small
      color="secondary"
      class="ma-2"
      :loading="memberMetricsLoading"
    >
      <template slot="icon-left">
        <v-icon left dark>mdi-arrow-up-bold-box-outline</v-icon>
      </template>
    </UploadButton>
  </div>
</template>

<i18n>
{
  "en": {
    "inventory": "INVENTORY"
  },
  "la": {
    "inventory": "ສິນຄ້າຄົງຄັງ"
  }
}
</i18n>

<script>
import UploadButton from '@/components/UploadButton.vue';
import XLSX from 'xlsx';
import farmerColumns from '@/data/farmer-columns';
import irrigationColumns from '@/data/irrigation-columns';
import businessesColumns from '@/data/business-columns';
import metricsColumns from '@/data/metrics-columns';
import memberMetricsColumns from '@/data/member-metrics-columns';
import factorsColumns from '@/data/factors-columns';
import MainService from '@/services/MainService';

const parseValueForDb = (value) => {
  if (!value) {
    return null;
  }
  if (value === ' ') {
    return null;
  }

  if (value === 'Y') {
    return true;
  }
  if (value === 'N') {
    return false;
  }
  if (value === 'n0') {
    return 0;
  }
  if (value.toString().toLowerCase().includes('2 time')) {
    return 2;
  }
  if ([value.toString().toLowerCase()].includes('male', 'm', 'ຊ')) {
    return 'M';
  }
  if ([value.toString().toLowerCase()].includes('female', 'f', 'ຍ')) {
    return 'F';
  }
  if ([value.toString().toLowerCase()].includes('ແມ່ນ', 'y', 'yes')) {
    return 1;
  }
  if ([value.toString().toLowerCase()].includes('n', 'no')) {
    return 0;
  }
  if (value.toString().toLowerCase() === 'no') {
    return 0;
  }
  if (value.toString().includes(' Province')) {
    return value.toString().replace(' Province', '');
  }
  return String(value).trim();
};

const add0IfLength = (id, length) => {
  if (id?.length === length) {
    id = `0${id}`;
  }
  return id;
};

const adaptProvinceId = (id) => add0IfLength(id, 1);
const adaptDistrictId = (provinceId, id) => {
  let res = add0IfLength(id, 3);
  if (res.length === 2) {
    return `${provinceId}${res}`;
  }
  return res;
};
const adaptVillageId = (districtId, id) => {
  let res = add0IfLength(id, 6);
  if (res.length === 3) {
    return `${districtId}${res}`;
  }
  return res;
};

export default {
  name: 'TheSettings',
  data() {
    return {
      period: '',
      bridgesList: [],
      computeLoading: false,
      problems: [],
      dialog: false,
      farmerLoading: false,
      metricsLoading: false,
      irrigationLoading: false,
      businessesLoading: false,
      memberMetricsLoading: false,
      factorLoading: false,
      error: false,
      error_message: '',
    };
  },
  components: {
    UploadButton,
  },
  methods: {
    async uploadFile(file) {
      this.message = 'Uploading file';
      this.result_dialog = true;
      if (file.size > this.maxFileSize) {
        this.error = true;
        this.error_message = `File size exceeded the maximum of ${this.maxFileSize}`;
        return;
      }

      this.parseExcel(file, file.data.type);
    },
    renameForTable(columns, table, row) {
      const oldColumns = Object.keys(columns[table]);
      const data = {};
      oldColumns.forEach((c) => {
        data[columns[table][c]] = parseValueForDb(row[c]);
      });
      return data;
    },
    async ingestMetrics(rows) {
      try {
        this.metricsLoading = true;
        this.problems = [];

        const metrics = [];
        rows.map((row) => {
          const newRow = {};

          newRow.district_id = row[metricsColumns.district_id];
          newRow.group_type = row[metricsColumns.group_type];
          newRow.gender_group = row[metricsColumns.gender_group];

          metricsColumns.metrics.forEach((m) => {
            metrics.push({
              ...newRow,
              period: this.period,
              metric_type_id: m.db,
              value: row[m.xlsx],
            });
          });

          return newRow;
        });

        await MainService.ingest('metrics', metrics);
        this.metricsLoading = false;
      } catch (err) {
        console.log(err);
        this.metricsLoading = false;
      }
    },
    async ingestMemberMetrics(rows) {
      try {
        this.memberMetricsLoading = true;
        this.problems = [];

        const metrics = [];
        rows.map((row) => {
          const newRow = {};

          newRow.group_member_id = row[memberMetricsColumns.group_member_id];
          newRow.group_id = row[memberMetricsColumns.group_id];

          memberMetricsColumns.female_sample.forEach((col) => {
            if (row[col]) {
              newRow.female_sample = true;
            }
          });

          memberMetricsColumns.all_sample.forEach((col) => {
            if (row[col]) {
              newRow.all_sample = true;
            }
          });

          memberMetricsColumns.metrics.forEach((m) => {
            metrics.push({
              ...newRow,
              period: this.period,
              metric_type_id: m.db,
              value: row[m.xlsx],
            });
          });

          return newRow;
        });

        await MainService.ingest('member-metrics', metrics);
        this.memberMetricsLoading = false;
      } catch (err) {
        console.log(err);
        this.memberMetricsLoading = false;
      }
    },
    formatLocations(columns, row) {
      const newRow = {};
      newRow.province = this.renameForTable(columns, 'province', row);
      newRow.province.id = adaptProvinceId(newRow.province.id);

      newRow.district = this.renameForTable(columns, 'district', row);
      newRow.district.id = adaptDistrictId(
        newRow.province.id,
        newRow.district.id,
      );
      newRow.district.province_id = adaptProvinceId(
        newRow.district.province_id,
      );

      newRow.village = this.renameForTable(columns, 'village', row);
      newRow.village.id = adaptVillageId(newRow.district.id, newRow.village.id);
      newRow.village.district_id = adaptDistrictId(
        newRow.province.id,
        newRow.village.district_id,
      );
      return newRow;
    },
    async ingestFarmer(rows) {
      try {
        this.farmerLoading = true;
        this.problems = [];
        const farmers = rows.map((row) => {
          const newRow = {
            ...this.formatLocations(farmerColumns, row),
          };

          newRow.farmer_group = {
            ...this.renameForTable(farmerColumns, 'farmer_group', row),
            village_id: newRow.village.id,
          };
          newRow.group_member = {
            ...this.renameForTable(farmerColumns, 'group_member', row),
            group_id: newRow.farmer_group.id,
          };
          // newRow.crop_production = [];

          // const rice_ws = {
          //   ...this.renameForTable(
          //     farmerColumns,
          //     'crop_production_rice_ws',
          //     row,
          //   ),
          //   season: 'ws',
          //   year: 2021,
          //   crop: 'rice',
          //   group_member_id: newRow.group_member.id,
          // };
          // if (rice_ws.land_area != null) {
          //   newRow.crop_production.push(rice_ws);
          // }

          // const rice_ds = {
          //   ...this.renameForTable(
          //     farmerColumns,
          //     'crop_production_rice_ds',
          //     row,
          //   ),
          //   season: 'ds',
          //   year: 2021,
          //   crop: 'rice',
          //   group_member_id: newRow.group_member.id,
          // };
          // if (rice_ds.land_area != null) {
          //   newRow.crop_production.push(rice_ds);
          // }

          // const soybean_melon = {
          //   ...this.renameForTable(
          //     farmerColumns,
          //     'crop_production_soybean_melon',
          //     row,
          //   ),
          //   season: 'ds',
          //   year: 2021,
          //   crop: 'soybean_melon',
          //   group_member_id: newRow.group_member.id,
          // };
          // if (soybean_melon.land_area != null) {
          //   newRow.crop_production.push(soybean_melon);
          // }

          // newRow.fertilizer_use = [];
          // const fertilizer_use_ws = {
          //   ...this.renameForTable(farmerColumns, 'fertilizer_use_ws', row),
          //   season: 'ws',
          //   year: 2021,
          //   group_member_id: newRow.group_member.id,
          // };
          // if (fertilizer_use_ws.type_organic != null) {
          //   newRow.fertilizer_use.push(fertilizer_use_ws);
          // }

          // const fertilizer_use_ds = {
          //   ...this.renameForTable(farmerColumns, 'fertilizer_use_ds', row),
          //   season: 'ds',
          //   year: 2021,
          //   group_member_id: newRow.group_member.id,
          // };
          // if (fertilizer_use_ds.type_organic != null) {
          //   newRow.fertilizer_use.push(fertilizer_use_ds);
          // }

          // newRow.partnership_contract = [
          //   {
          //     ...this.renameForTable(
          //       farmerColumns,
          //       'partnership_contract',
          //       row,
          //     ),
          //     group_member_id: newRow.group_member.id,
          //   },
          // ];

          return newRow;
        });
        await MainService.ingest('farmers', farmers);
        this.farmerLoading = false;
      } catch (err) {
        console.log(err);
        this.farmerLoading = false;
      }
    },
    async ingestIrrigation(rows) {
      try {
        this.irrigationLoading = true;
        this.problems = [];

        const data = rows.map((row) => {
          const newRow = {
            ...this.formatLocations(irrigationColumns, row),
          };

          newRow.irrigation_scheme = {
            ...this.renameForTable(irrigationColumns, 'irrigation_scheme', row),
            village_id: newRow.village.id,
          };
          newRow.name_la = newRow.name_en;

          return newRow;
        });

        await MainService.ingest('irrigation', data);
        this.irrigationLoading = false;
      } catch (err) {
        console.log(err);
        this.irrigationLoading = false;
      }
    },
    async ingestBusinesses(rows) {
      try {
        this.businessesLoading = true;
        this.problems = [];
        const data = rows
          .filter((row) => row.PCode)
          .map((row) => {
            const newRow = {
              ...this.formatLocations(businessesColumns, row),
            };

            newRow.agri_business = {
              ...this.renameForTable(businessesColumns, 'agri_business', row),
              village_id: newRow.village.id,
            };
            newRow.agri_business.longitude = newRow.agri_business.longitude
              ?.toString()
              .replace(',', '.');
            newRow.agri_business.latitude = newRow.agri_business.latitude
              ?.toString()
              .replace(',', '.');
            newRow.agri_business.name_la = newRow.agri_business.name_en;
            return newRow;
          });

        await MainService.ingest('businesses', data);
        this.businessesLoading = false;
      } catch (err) {
        console.log(err);
        this.businessesLoading = false;
      }
    },
    async ingestFactors(rows) {
      try {
        this.factorLoading = true;
        const period = this.period;
        const data = rows.map((row) => {
          const newRow = {
            farmer_group_id: row[factorsColumns['farmer_group_id']],
            period,
          };
          factorsColumns.factors.forEach((gender) => {
            gender.columns.forEach((col) => {
              const value = row[col];
              if (value) {
                newRow.gender_group = gender.gender_group;
                newRow.value = value;
              }
            });
          });

          return newRow;
        });

        await MainService.ingest(
          'factors',
          data.filter(
            (v, i, a) =>
              a.findIndex(
                (t) =>
                  t.farmer_group_id === v.farmer_group_id &&
                  t.gender_group === v.gender_group,
              ) === i,
          ),
        );
        this.factorLoading = false;
      } catch (err) {
        console.log(err);
        this.factorLoading = false;
      }
    },
    parseExcel(file, type) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: 'binary',
        });
        const rows = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets['Data'],
        );
        if (type === 'farmers') {
          this.ingestFarmer(rows);
        }
        if (type === 'metrics') {
          this.ingestMetrics(rows);
        }
        if (type === 'irrigation') {
          this.ingestIrrigation(rows);
        }
        if (type === 'businesses') {
          this.ingestBusinesses(rows);
        }
        if (type === 'factors') {
          this.ingestFactors(rows);
        }
        if (type === 'member-metrics') {
          this.ingestMemberMetrics(rows);
        }
      };

      reader.onerror = function (ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    },
  },
};
</script>
