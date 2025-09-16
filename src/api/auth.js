import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const api = axios.create({
  baseURL: "https://saluddigna-api.onrender.com",
  withCredentials: true,
});

export const loginUser = async (credentials) => {
  try {
    await api.get("/sanctum/csrf-cookie");

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
