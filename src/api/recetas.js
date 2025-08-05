import axios from "./axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const getRecetas = async () => {
  try {
    const response = await axios.get("/recetas");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al obtener recetas";
    toast.error(message);
    throw error;
  }
};

export const getRecetaById = async (id) => {
  try {
    const response = await axios.get(`/recetas/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Receta no encontrada";
    toast.error(message);
    throw error;
  }
};

export const createReceta = async (recetaData) => {
  try {
    const response = await axios.post("/recetas", recetaData);
    toast.success("Receta creada correctamente");
    return response.data;
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((err) => toast.error(err));
    } else {
      toast.error(error.response?.data?.message || "Error al crear receta");
    }
    throw error;
  }
};

export const updateReceta = async (id, recetaData) => {
  try {
    const response = await axios.put(`/recetas/${id}`, recetaData);
    toast.success("Receta actualizada correctamente");
    return response.data;
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((err) => toast.error(err));
    } else {
      toast.error(
        error.response?.data?.message || "Error al actualizar receta"
      );
    }
    throw error;
  }
};

export const getRecetaCompletaById = async (id) => {
  try {
    const response = await axios.get(`/recetas/${id}/completa`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Receta no encontrada";
    toast.error(message);
    throw error;
  }
};

export const getRecetasPorPaciente = async (idPaciente) => {
  try {
    const response = await axios.get(`/recetas/paciente/${idPaciente}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al obtener recetas del paciente";
    console.error(message);
    throw error;
  }
};
