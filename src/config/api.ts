import axios from "axios";

// export const API_URL = 'http://34.192.218.37:8080/api/v1';
// export const API_URL = 'http://127.0.0.1:8080/api/v1';
// export const API_URL = 'http://52.54.222.16:8080/api/v1';

export const API_URL = 'https://941e-52-54-222-16.ngrok.io/api/v1';





const apiClient = axios.create({
  baseURL: API_URL, // <- ENV variable
});
// apiClient.interceptors.request.use((config) => {
//   return ({
//     ...config,
//     headers: {
//     },
//   })
// },
//   error => Promise.reject(error),
// );

// apiClient.interceptors.response.use((response) =>
//   response,
//   async (error) => {
//     return Promise.reject(error.response.data);
//   },
// );

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };