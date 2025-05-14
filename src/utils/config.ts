const isDev = window.location.hostname === "localhost";

export const BASE_API_URL = isDev
  ? "http://localhost:5000/api"
  : "/api";
