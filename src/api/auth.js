import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const api = axios.create({
  baseURL: "https://saluddigna-api.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(match[1]);
  }
  return config;
});

export const loginUser = async (credentials) => {
  try {
    // primero se piden las cookies
    await api.get("/sanctum/csrf-cookie");

    // después se hace login con el token ya en el header
    const response = await api.post("/login", credentials);

    toast.success(response.data?.message || "Inicio de sesión exitoso");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error del servidor";
    toast.error(errorMessage);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/logout");
    toast.success(response.data?.message || "Sesión cerrada correctamente");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al cerrar sesión";
    toast.error(message);
    throw error;
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data.user;
  } catch (error) {
    toast.error("Usuario no autenticado");
    throw error;
  }
};
