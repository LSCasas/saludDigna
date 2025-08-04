import axios from "./axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const getCitas = async () => {
  try {
    const response = await axios.get("/citas");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al obtener citas";
    toast.error(message);
    throw error;
  }
};

export const getCitaById = async (id) => {
  try {
    const response = await axios.get(`/citas/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Cita no encontrada";
    toast.error(message);
    throw error;
  }
};

export const createCita = async (citaData) => {
  try {
    const response = await axios.post("/citas", citaData);
    toast.success("Cita creada exitosamente");
    return response.data;
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((err) => toast.error(err));
    } else {
      toast.error(error.response?.data?.message || "Error al crear cita");
    }
    throw error;
  }
};

export const updateCita = async (id, citaData) => {
  try {
    const response = await axios.put(`/citas/${id}`, citaData);
    toast.success("Cita actualizada exitosamente");
    return response.data;
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((err) => toast.error(err));
    } else {
      toast.error(error.response?.data?.message || "Error al actualizar cita");
    }
    throw error;
  }
};

export const deleteCita = async (id) => {
  try {
    const response = await axios.delete(`/citas/${id}`);
    toast.success(response.data?.message || "Cita eliminada exitosamente");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al eliminar cita";
    toast.error(message);
    throw error;
  }
};
