import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-commons-dashboard.herokuapp.com/',
});

export default api;
