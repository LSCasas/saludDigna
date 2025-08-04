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
          @change="$emit('agregarPaciente')"
        />
        <label for="new-patient" class="cursor-pointer">Agregar paciente</label>
      </div>
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

    <!-- Motivo -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Motivo</label>
      <select
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 bg-white text-gray-700"
      >
        <option>Consulta</option>
        <option>Procedimiento</option>
        <option>Tratamiento en curso</option>
      </select>
    </div>

    <!-- Fecha -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Fecha</label>
      <input
        type="date"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
      />
    </div>

    <!-- Hora inicio -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Hora inicio</label>
      <input
        type="time"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
      />
    </div>

    <!-- Nota -->
    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700"
        >Nota de la cita</label
      >
      <textarea
        rows="3"
        placeholder="Escribe aquí..."
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-700"
      ></textarea>
    </div>

    <!-- Botones -->
    <div class="md:col-span-2 flex justify-end gap-2 mt-4">
      <button
        type="button"
        class="px-4 py-2 rounded border border-[#D8D8D8] text-gray-700 bg-white"
        @click="recargarPagina"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 py-2 rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
      >
        Guardar
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { getPacientes, getPacienteById } from "../api/pacientes.js";

const search = ref("");
const pacientes = ref([]);
const pacientesFiltrados = ref([]);
const mostrarLista = ref(false);
const pacientesCargados = ref(false);

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
        }));
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

    search.value = `${data.nombre} ${data.apellidoP} ${data.apellidoM}`;
    mostrarLista.value = false;
    // Puedes emitir o guardar más datos del paciente si lo necesitas
  } catch (error) {
    console.error("Error al obtener paciente:", error);
  }
};

function handleSubmit() {
  // Aquí pones tu lógica de envío de formulario
  console.log("Formulario enviado");
}
</script>
