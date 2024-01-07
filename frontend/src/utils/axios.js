import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3003/',
    baseURL: 'https://vozbackend-dot-voz-2023-410302.et.r.appspot.com/',
});

export default instance;
