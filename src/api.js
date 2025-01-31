import axios from 'axios';

export const api = axios.create({
    baseURL: "https://fashion-backend-r8hh.onrender.com"
});

// export const api = axios.create({
//     baseURL: "http://localhost:4000"
// })
