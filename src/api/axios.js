import axios from "axios";

// Crear instancia
const instance = axios.create({
  baseURL: "https://porttusalud-api.lscasas.dev",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//  Inyectar XSRF-TOKEN desde cookie al header que Laravel espera
instance.interceptors.request.use((config) => {
  const token = decodeURIComponent(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] || ""
  );

  if (token) {
    config.headers["X-XSRF-TOKEN"] = token;
  }

  return config;
});

export default instance;
