import axios from "axios";

const djangoAPI = axios.create({
  baseURL: process.env.DJANGO_BASE_URL,
});

// Attach token from frontend request
djangoAPI.interceptors.request.use((req) => {
  if (req.headers.Authorization) {
    req.headers.Authorization = req.headers.Authorization;
  }
  return req;
});

export default djangoAPI;
