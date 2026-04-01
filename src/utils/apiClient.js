const axios = require("axios");

const apiClient = axios.create({
  baseURL: process.env.DJANGO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = apiClient;
