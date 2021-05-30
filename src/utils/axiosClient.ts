// utils/API.js
import axios from "axios";
import AsyncStorageUtil from "./AsyncStorageUtil";

const config = {
  BASE_URL: "https://3emru0yz2e.execute-api.eu-west-1.amazonaws.com/dev/api/",
};

const axiosClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//--> authenticating each request with a token
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorageUtil.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// axiosClient.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   async function(error) {
//     // eslint-disable-next-line no-debugger
//     // debugger;
//     if (error.response?.status === 401) {
//       // logout();
//       // window.location.reload();
//     }
//     // Reject promise if usual error
//     if (error?.message === "Network Error") {
//       doToast("Network Error", "error");
//       return Promise.reject(error?.message);
//     }
//   }
// );

export default axiosClient;
