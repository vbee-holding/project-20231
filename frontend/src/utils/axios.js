import axios from 'axios';

const isDevelopment = process.env.NODE_ENV !== 'production';
let baseURL;

if (isDevelopment) {
  baseURL = 'http://localhost:3003/';
} else {
  baseURL = 'http://194.233.74.59:3003';
}
console.log(baseURL);
console.log(process.env);

const instance = axios.create({
  baseURL: baseURL
});

export default instance;
