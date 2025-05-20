const isDev = window.location.hostname === "localhost";

export const BASE_API_URL = isDev
  ? "http://localhost:5000/api"
  : "/api";


  export const SOCKET_URL = isDev
  ? "http://localhost:5000"
  : "http://65.0.95.115";