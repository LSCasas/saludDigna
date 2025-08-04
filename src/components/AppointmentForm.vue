<template>
  <form
    @submit.prevent="handleSubmit"
    class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
  >
    <!-- Buscar paciente -->
    <div class="md:col-span-2">
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
        <label for="new-patient" class="cursor-pointer">Agregar paciente</label>
      </div>
    </div>

    <!-- Formulario PatientForm (sección independiente) -->
    <div class="md:col-span-2 mt-4" v-if="mostrarFormularioPaciente">
      <PatientForm
        @cancelar="mostrarFormularioPaciente = false"
        @guardado="onPacienteGuardado"
      />
    </div>

    <!-- Lista de pacientes -->
    <div
      v-if="mostrarLista && pacientesFiltrados.length"
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
    <div
      v-if="!mostrarFormularioPaciente"
      class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
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

      <!-- Fecha -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          v-model="form.fecha_cita"
          type="date"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
          required
        />
      </div>

      <!-- Hora inicio -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Hora inicio</label
        >
        <input
          v-model="form.hora_cita"
          type="time"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
          required
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
      <div class="md:col-span-2 flex justify-end gap-2 mt-4">
        <button
          type="submit"
          class="px-4 py-2 cursor-pointer rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { getPacientes, getPacienteById } from "../api/pacientes.js";
import { createCita } from "../api/citas.js";
import PatientForm from "./PatientForm.vue";

const mostrarFormularioPaciente = ref(false);
const idPacienteSeleccionado = ref(null);
const search = ref("");
const pacientes = ref([]);
const pacientesFiltrados = ref([]);
const mostrarLista = ref(false);
const pacientesCargados = ref(false);

const form = ref({
  motivo: "",
  fecha_cita: "",
  hora_cita: "",
  nota: "",
});

const onPacienteGuardado = async (nuevoPaciente) => {
  mostrarFormularioPaciente.value = false;
  search.value = "";
  idPacienteSeleccionado.value = null;

  // Cerrar la lista de pacientes
  mostrarLista.value = false;

  // Recargar lista de pacientes sin recargar toda la página
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

function recargarPagina() {
  window.location.reload();
}

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

          if (lastNameA < lastNameB) return -1;
          if (lastNameA > lastNameB) return 1;

          // Si los apellidos son iguales, ordena por nombre
          return a.firstName
            .toLowerCase()
            .localeCompare(b.firstName.toLowerCase());
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
  if (!paciente.id) return;

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
    fecha_cita: form.value.fecha_cita,
    hora_cita: form.value.hora_cita,
    motivo: form.value.motivo,
    estado: "pendiente",
    nota: form.value.nota,
  };

  try {
    await createCita(citaData);
    recargarPagina();
  } catch (error) {
    console.error("Error al crear cita:", error);
  }
};
</script>
