import axios from "axios"

const instance = axios.create({
  baseURL: 'https://uzb.technostudio.uz/' + 'api/v1/',
});

export default instance;