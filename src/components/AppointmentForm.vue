<template>
  <form
    @submit.prevent="handleSubmit"
    class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
  >
    <!-- Buscar o mostrar paciente -->
    <div class="md:col-span-2">
      <!-- Campo paciente (solo en creación) -->
      <template v-if="!isEdicion">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Paciente</label
        >
        <div class="flex items-center gap-4">
          <input
            v-model="search"
            @focus="mostrarPacientes"
            @input="filtrarPacientes"
            type="text"
            placeholder="Buscar paciente"
            class="w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
          />
        </div>
        <div class="flex items-center mt-2 text-sm text-gray-700">
          <input
            id="new-patient"
            type="radio"
            name="patientOption"
            class="text-[#B22222] focus:ring-[#B22222] border-[#D8D8D8] mr-2"
            @change="mostrarFormularioPaciente = true"
          />
          <label for="new-patient" class="cursor-pointer"
            >Agregar paciente</label
          >
        </div>
      </template>

      <!-- Mostrar nombre completo (solo en edición) -->
      <template v-else>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Nombre</label
        >
        <input
          :value="search"
          type="text"
          class="w-full border border-[#D8D8D8] bg-gray-100 text-gray-600 px-3 py-2 rounded"
          disabled
        />
      </template>
    </div>

    <!-- Formulario PatientForm -->
    <div class="md:col-span-2 mt-4" v-if="mostrarFormularioPaciente">
      <PatientForm
        @cancelar="mostrarFormularioPaciente = false"
        @guardado="onPacienteGuardado"
      />
    </div>

    <!-- Lista de pacientes -->
    <div
      v-if="mostrarLista && pacientesFiltrados.length && !isEdicion"
      class="md:col-span-2 border border-gray-300 rounded p-2"
    >
      <ul class="text-sm text-gray-800 max-h-40 overflow-y-auto">
        <li
          v-for="(paciente, index) in pacientesFiltrados"
          :key="index"
          class="py-1 border-b last:border-none cursor-pointer hover:bg-gray-100 px-2"
          @click="seleccionarPaciente(paciente)"
        >
          {{ paciente.firstName }} {{ paciente.lastNameP }}
          {{ paciente.lastNameM }}
        </li>
      </ul>
    </div>

    <!-- Motivo -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Motivo</label>
      <select
        v-model="form.motivo"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 bg-white text-gray-700"
        required
      >
        <option disabled value="">Selecciona una opción</option>
        <option>Consulta</option>
        <option>Procedimiento</option>
        <option>Tratamiento en curso</option>
      </select>
    </div>

    <!-- Estado (solo en edición) -->
    <div v-if="isEdicion">
      <label class="block text-sm font-medium text-gray-700">Estado</label>
      <select
        v-model="form.estado"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 bg-white text-gray-700"
        required
      >
        <option value="pendiente">Pendiente</option>
        <option value="atendida">Atendida</option>
        <option value="cancelada">Cancelada</option>
      </select>
    </div>

    <!-- Fecha -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Fecha</label>
      <input
        v-model="form.fecha_cita"
        type="date"
        :min="hoy"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
        required
      />
    </div>

    <!-- Hora inicio -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Hora inicio</label>
      <input
        v-model="form.hora_cita"
        type="time"
        :min="form.fecha_cita === hoy ? horaActual : null"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
        required
        @invalid="setMensajeHora"
        @input="limpiarMensajeHora"
      />
    </div>

    <!-- Nota -->
    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700"
        >Nota de la cita</label
      >
      <textarea
        v-model="form.nota"
        rows="3"
        placeholder="Escribe aquí..."
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
      ></textarea>
    </div>

    <!-- Botones -->
    <div class="md:col-span-2 flex gap-4 mt-2">
      <button
        type="submit"
        class="px-4 py-2 cursor-pointer rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
      >
        {{ isEdicion ? "Guardar" : "Crear" }}
      </button>

      <!-- Botón eliminar (solo en edición) -->
      <button
        v-if="isEdicion"
        type="button"
        @click="eliminarCita"
        class="px-4 py-2 cursor-pointer rounded bg-gray-300 text-[#B22222] hover:bg-gray-400"
      >
        Eliminar
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { getPacientes, getPacienteById } from "../api/pacientes.js";
import { createCita, updateCita, deleteCita } from "../api/citas.js";
import PatientForm from "./PatientForm.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  cita: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["cancelar", "guardado"]);

const hoy = new Date().toISOString().split("T")[0];
const ahora = new Date();
const horaActual = ahora.toTimeString().slice(0, 5);
const setMensajeHora = (e) => {
  e.target.setCustomValidity("La hora debe ser igual o posterior a la actual.");
};

const limpiarMensajeHora = (e) => {
  e.target.setCustomValidity("");
};
const mostrarFormularioPaciente = ref(false);
const idPacienteSeleccionado = ref(null);
const search = ref("");
const pacientes = ref([]);
const pacientesFiltrados = ref([]);
const mostrarLista = ref(false);
const pacientesCargados = ref(false);
const isEdicion = ref(false);

const form = reactive({
  motivo: "",
  fecha_cita: "",
  hora_cita: "",
  nota: "",
  estado: "pendiente", // agregado para edición
});

watch(
  () => props.cita,
  (nuevaCita) => {
    if (nuevaCita && Object.keys(nuevaCita).length > 0) {
      isEdicion.value = true;
      form.motivo = nuevaCita.motivo || "";
      form.fecha_cita = nuevaCita.fecha_cita || "";
      form.hora_cita = nuevaCita.hora_cita || "";
      form.nota = nuevaCita.nota || "";
      form.estado = nuevaCita.estado || "pendiente";
      idPacienteSeleccionado.value = nuevaCita.id_paciente || null;

      if (nuevaCita.paciente) {
        const p = nuevaCita.paciente;
        search.value = `${p.nombre} ${p.apellidoP} ${p.apellidoM}`;
      }
    }
  },
  { immediate: true }
);

const onPacienteGuardado = async (nuevoPaciente) => {
  mostrarFormularioPaciente.value = false;
  search.value = "";
  idPacienteSeleccionado.value = null;
  mostrarLista.value = false;

  try {
    const data = await getPacientes();
    pacientes.value = data
      .filter((p) => p.estado === "activo")
      .map((p) => ({
        id: p.id_paciente,
        firstName: p.nombre,
        lastNameP: p.apellidoP,
        lastNameM: p.apellidoM,
      }));
    pacientesFiltrados.value = pacientes.value;
  } catch (error) {
    console.error("Error recargando pacientes:", error);
  }
};

const mostrarPacientes = async () => {
  if (!pacientesCargados.value) {
    try {
      const data = await getPacientes();
      pacientes.value = data
        .filter((p) => p.estado === "activo")
        .map((p) => ({
          id: p.id_paciente,
          firstName: p.nombre,
          lastNameP: p.apellidoP,
          lastNameM: p.apellidoM,
        }))
        .sort((a, b) => {
          const lastNameA = `${a.lastNameP} ${a.lastNameM}`.toLowerCase();
          const lastNameB = `${b.lastNameP} ${b.lastNameM}`.toLowerCase();
          return (
            lastNameA.localeCompare(lastNameB) ||
            a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
          );
        });

      pacientesFiltrados.value = pacientes.value;
      pacientesCargados.value = true;
    } catch (error) {
      console.error(error);
    }
  }
  mostrarLista.value = true;
};

const filtrarPacientes = () => {
  const filtro = search.value.toLowerCase();
  pacientesFiltrados.value = pacientes.value.filter((p) => {
    const fullName =
      `${p.firstName} ${p.lastNameP} ${p.lastNameM}`.toLowerCase();
    return fullName.includes(filtro);
  });
};

const seleccionarPaciente = async (paciente) => {
  try {
    const data = await getPacienteById(paciente.id);
    idPacienteSeleccionado.value = data.id_paciente;
    search.value = `${data.nombre} ${data.apellidoP} ${data.apellidoM}`;
    mostrarLista.value = false;
  } catch (error) {
    console.error("Error al obtener paciente:", error);
  }
};

const handleSubmit = async () => {
  if (!idPacienteSeleccionado.value) {
    alert("Debes seleccionar un paciente antes de guardar.");
    return;
  }

  const citaData = {
    id_paciente: idPacienteSeleccionado.value,
    fecha_cita: form.fecha_cita,
    hora_cita: form.hora_cita,
    motivo: form.motivo,
    estado: form.estado,
    nota: form.nota,
  };

  try {
    if (isEdicion.value && props.cita.id_cita) {
      await updateCita(props.cita.id_cita, citaData);
      window.location.reload();
    } else {
      await createCita(citaData);
    }
    emit("guardado", citaData);
  } catch (error) {
    console.error("Error al guardar cita:", error);
  }
};

const eliminarCita = async () => {
  if (props.cita.id_cita && confirm("¿Estás seguro de eliminar esta cita?")) {
    try {
      await deleteCita(props.cita.id_cita);
      emit("guardado");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar cita:", error);
    }
  }
};
</script>
