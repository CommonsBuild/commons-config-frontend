import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-commons-config-backend.herokuapp.com/',
});

export default api;
