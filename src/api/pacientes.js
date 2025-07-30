import axios from "./axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const getPacientes = async () => {
  try {
    const response = await axios.get("/pacientes");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al obtener pacientes";
    toast.error(message);
    throw error;
  }
};

export const getPacienteById = async (id) => {
  try {
    const response = await axios.get(`/pacientes/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Paciente no encontrado";
    toast.error(message);
    throw error;
  }
};

export const createPaciente = async (pacienteData) => {
  try {
    const response = await axios.post("/pacientes", pacienteData);
    toast.success(response.data?.message || "Paciente creado correctamente");
    return response.data;
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((err) => toast.error(err));
    } else {
      toast.error(error.response?.data?.message || "Error al crear paciente");
    }
    throw error;
  }
};

export const updatePaciente = async (id, pacienteData) => {
  try {
    const response = await axios.put(`/pacientes/${id}`, pacienteData);
    toast.success(
      response.data?.message || "Paciente actualizado correctamente"
    );
    return response.data;
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((err) => toast.error(err));
    } else {
      toast.error(
        error.response?.data?.message || "Error al actualizar paciente"
      );
    }
    throw error;
  }
};
