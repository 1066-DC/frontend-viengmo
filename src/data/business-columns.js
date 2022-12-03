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
  "agri_business": {
    "Agribusiness ID": "id",
    "Agribusiness name": "name",
    "Vcode": "village_id",
    " Latitude of AB location  in decimal degrees": "longitude",
    " Longitude of AB location in decimal degrees": "latitude",
    "Agribusiness code": "code",
    "Date of data updating": "date_of_data_updating",
    "Status of implementation": "status_implementation",
    "Description of Business Plan ": "description_business_plan",
    "Main objectives of Business plan": "objective_business_plan",
  },
}