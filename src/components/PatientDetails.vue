<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Buscar y agregar paciente -->
    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Paciente
      </label>
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
        >
          {{ paciente.firstName }} {{ paciente.lastNameP }}
          {{ paciente.lastNameM }}
        </li>
      </ul>
    </div>

    <!-- Nombre -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Nombre</label>
      <input
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Apellidos -->
    <div class="flex gap-2">
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700">
          Apellido Paterno
        </label>
        <input
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
        />
      </div>
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700">
          Apellido Materno
        </label>
        <input
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
        />
      </div>
    </div>

    <!-- Género -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Género</label>
      <select
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      >
        <option>Hombre</option>
        <option>Mujer</option>
        <option>Otro</option>
        <option>Prefiero no decir</option>
      </select>
    </div>

    <!-- Edad -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Edad</label>
      <input
        type="number"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getPacientes } from "../api/pacientes.js";

const pacientes = ref([]);
const pacientesFiltrados = ref([]);
const search = ref("");
const mostrarLista = ref(false);
const pacientesCargados = ref(false);

const mostrarPacientes = async () => {
  if (!pacientesCargados.value) {
    try {
      const data = await getPacientes();
      pacientes.value = data.map((p) => ({
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
</script>
