import axios from 'axios';

const isDevelopment = process.env.NODE_ENV !== 'production';
let baseURL;

if (isDevelopment) {
  baseURL = 'http://localhost:3003/';
} else {
  baseURL = 'https://vozbackend-dot-voz-2023-410302.et.r.appspot.com/';
}

const instance = axios.create({
  baseURL: baseURL
});

export default instance;