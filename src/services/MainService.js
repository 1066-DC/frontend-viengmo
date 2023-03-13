import Api from "@/services/Api";

export default {
  getBuilding(id) {
    return Api().get(`buildings/${id}?populate[0]=use_function,usage_status,medias,architectural_elements.picture_example,history_events,construction_compagnies,architect,current_owner,bibliographic_references,building_groups&populate[1]=front`);
  },
  getBuildingLocations() {
    return Api().get(`buildings?fields[0]=longitude&fields[1]=latitude&fields[2]=name&populate[0]=front`);
  },
  getBreadCrumbs(granularity, value, projectType) {
    return Api().get(`data/${granularity}/${value}/${projectType}`);
  },
  getProjects(projectType, granularity, value, name, page) {
    return Api().get(`/projects/`, {
      params: {
        projectType,
        granularity,
        value,
        name,
        page,
      }
    });
  },
  getMetrics(type, metrics, granularity, value) {
    return Api().get(`${type}/${metrics}/${granularity}/${value}`);
  },
  getExtrapolatedMetrics(granularity, value, groupType) {
    return Api().get(`extrapolated/${granularity}/${value}/${groupType}`);
  },
  getPictures(projectType, granularity, value, page, params) {
    return Api().get(`pictures/${projectType}/${granularity}/${value}/${page}`, { params });
  },
  countPictures(projectType, granularity, value, params) {
    return Api().get(`pictures-count/${projectType}/${granularity}/${value}`, { params });
  },
  ingest(resource, data) {
    return Api().put(resource, data);
  },
  uploadMedia(type, caseNumber, payload) {
    return Api().post(`media/${type}/${caseNumber}`, payload);
  },

};

