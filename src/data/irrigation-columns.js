export default {
  "province": {
    "PCode": "id",
    "PNameLao": "name_la",
    "PNameEng": "name_en",
  },
  "district": {
    "DCode": "id",
    "DNameLao": "name_la",
    "DNameEng": "name_en",
    "PCode": "province_id",
  },
  "village": {
    "Vcode": "id",
    "VNameLao": "name_la",
    "VNameEng": "name_en",
    "DCode": "district_id",
    " Latitude ": "longitude",
    " Longitude ": "latitude",
  },
  "irrigation_scheme": {
    "Scheme ID": "id",
    "Scheme name": "name_en",
    "Vcode": "village_id",
    " Latitude of irrigation sheme in decimal degrees": "longitude",
    " Longitude of irrigation sheme in decimal degrees": "latitude",
    "WS ha before": "ws_ha_before",
    "WS ha after": "ws_ha_after",
    "DS ha before": "ds_ha_before",
    "DS ha after": "ds_ha_after",
    "Total ha before": "total_ha_before",
    "Total ha after": "total_ha_after",
    "Number of beneficiaries all": "number_of_beneficiaries",
    "Number of beneficiaries female": "number_of_female_beneficiaries",
    "Beneficiaries (HH)": 'hh_beneficiaries',
    "Date of data updating": "date_of_data_updating",
    "Status of implementation": "status_implementation",
    "Description of rehabilitation.": "description"
  },
}