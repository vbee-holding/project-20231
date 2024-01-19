import axios from 'axios';

const isDevelopment = process.env.NODE_ENV !== 'production';
let baseURL;

if (!isDevelopment) {
  baseURL = 'http://localhost:3003/';
} else {
  baseURL = process.env.BASE_URL;
}

const instance = axios.create({
  baseURL: baseURL
});

export default instance;