import axios from 'axios';

const api = axios.create({
  baseURL: 'https://commons-config-backend-0341701f27e5.herokuapp.com/',
});

export default api;
