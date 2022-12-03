import axios from "axios";

const baseURL = process.env.VUE_APP_ROOT_API + "/api";

export default () => {
  return axios.create({
    baseURL
  });
};
