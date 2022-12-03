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
  "farmer_group": {
    "Group ID": "id",
    "Date of Groups Establishment (05)": "date_establishment",
    "Group type": "group_type",
    " Latitude ": "latitude",
    " Longitude ": "longitude",
  },
  "group_member": {
    "Member ID": "id",
    "Name of group member(06)": "name",
    "HH Heads (Mark M:M, F:F) (07)": "gender",
    "Sex of Mgt Committeee (M:M, F:F) (09)": "gender_if_leader",
    "Member and function in management committee(08)": "role",
    "Family size(10)": "family_size",
    "Female Family members(11)": "female_family_members",
    "Total land area (ha) (12)": "land_area",
    "Cultivated area (ha)": "cultivated_land_area",
    "Address ": "address",
    "Call ": "phone",
    "Members of WUA (Y:yes, N:no) ": "wua_member",
  },
  "crop_production_rice_ws": {
    "WS Rice area (ha) (13)": "land_area",
    "Varieties of Seeds  (WS) (14)": "seed_variety",
    "Quantity of Seeds used for WS (Kg) (15)": "seed_quantity",
    "Tot. WS Prod. Output (Ton) (16) Estimated Yield ": "production_output",
    "Sale of WS Prod. Output (Ton) (17)": "sale_quantity",
    "Price in WS (LAK/Kg) (18)": "price",
  },
  "fertilizer_use_ws": {
    "Types of organic Fertilizers Used for WS (19)": "type_organic",
    "Quantity of organic Fertilizers Used for WS (kg)  (20)": "quantity_organic",
    "Types of Chemical Fertilizers Used for WS (%NPK) (21)": "type_chemical",
    "Quantity of Chemical Fertilizers Used for WS(kg)  (22)": "quantity_chemical",
    "Types of Pesticides Used for WS (23)": "type_pesticides",
    "Frequency of pesticides Used for WS (24)": "frequency_pesticides",
  },
  "crop_production_rice_ds": {
    "DS Rice Area (Ha) (25)": "land_area",
    "Varieties of Seeds (DS) (26)": "seed_variety",
    "Quantity of Seeds Used for DS (Kg) (27)": "seed_quantity",
    "Tot. DS Prod. Output (Ton) (28)": "production_output",
    "Sale of DS Prod. Output (Ton) (29)": "sale_quantity",
    "Price in DS (LAK/Kg) (30)": "price",
  },
  "crop_production_soybean_melon": {
    "DS Soy bean & water melon Area (Ha) (25) 2021": "land_area",
    "Varieties of Soy bean & water melonSeeds (DS) (26) 2021": "seed_variety",
    "Quantity of Soy bean & water melon Seeds Used for DS (Kg) (27) 2021": "seed_quantity",
    "Tot. DS Soy bean & water melon Prod. Output (Ton) (28) 2021": "production_output",
    "Sale of Soy bean & water melon in DS Prod. Output (Ton) (29) 2021": "sale_quantity",
    "Price of sale Prod.  (LAK/kg) (28)": "price",
  },
  "fertilizer_use_ds": {
    "Types of organic Fertilizers Used for DS (31)": "type_organic",
    "Quantity of organic Fertilizers Used for DS (Tons)  (32)": "quantity_organic",
    "Types of Chemical Fertilizers Used for DS (%NPK) (33)": "type_chemical",
    "Quantity of Chemical Fertilizers Used for DS (kg)  (34)": "quantity_chemical",
    "Types of Pesticides Used for DS (35)": "type_pesticides",
    "Frequency of pesticides Used for DS (36)": "frequency_pesticides",
  },
  "partnership_contract": {
    "Productive Partnership Contract signed with (Name of AB) ": "agri_business_id",
  }
}