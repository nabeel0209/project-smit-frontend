import axios from "axios";

const api = axios.create({
  baseURL: "/api", // relative now — Next.js rewrite handles the forwarding
  withCredentials: true,
});

export default api;
