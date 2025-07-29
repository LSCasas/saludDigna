import axios from "./axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const loginUser = async (credentials) => {
  try {
    await axios.get("/sanctum/csrf-cookie");
    const response = await axios.post("/login", credentials);

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
    const response = await axios.post("/logout");
    toast.success(response.data?.message || "Sesión cerrada correctamente");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al cerrar sesión";
    toast.error(message);
    throw error;
  }
};
