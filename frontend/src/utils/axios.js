import axios from 'axios';

const isDevelopment = process.env.NODE_ENV !== 'production';
let baseURL;

if (isDevelopment) {
  baseURL = 'http://localhost:3003/';
} else {
  baseURL = 'https://cloudrun-backend-service-lsz2erfp2q-et.a.run.app/';
}
console.log(baseURL);
console.log(process.env);

const instance = axios.create({
  baseURL: baseURL
});

export default instance;
