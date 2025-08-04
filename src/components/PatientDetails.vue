<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Buscar paciente -->
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
      <div class="flex items-center mt-2 text-sm text-gray-700">
        <input
          id="new-patient"
          type="radio"
          name="patientOption"
          class="text-[#B22222] focus:ring-[#B22222] border-[#D8D8D8] mr-2"
          @change="$emit('agregarPaciente')"
        />
        <label for="new-patient" class="cursor-pointer">
          Agregar paciente
        </label>
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

    <!-- Nombre -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Nombre</label>
      <input
        v-model="nombre"
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
        readonly
      />
    </div>

    <!-- Apellidos -->
    <div class="flex gap-2">
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700">
          Apellido Paterno
        </label>
        <input
          v-model="apellidoP"
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
          readonly
        />
      </div>
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700">
          Apellido Materno
        </label>
        <input
          v-model="apellidoM"
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
          readonly
        />
      </div>
    </div>

    <!-- Edad -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Edad</label>
      <input
        v-model="edad"
        type="number"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
        readonly
      />
    </div>

    <!-- Género -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Género</label>
      <select
        v-model="genero"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
        disabled
      >
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
        <option value="Prefiero no decir">Prefiero no decir</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["pacienteSeleccionado"]);
import { getPacientes, getPacienteById } from "../api/pacientes.js";

const pacientes = ref([]);
const pacientesFiltrados = ref([]);
const search = ref("");
const mostrarLista = ref(false);
const pacientesCargados = ref(false);

const nombre = ref("");
const apellidoP = ref("");
const apellidoM = ref("");
const genero = ref("");
const edad = ref(null);

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
          const lastNameA = a.lastNameP.toLowerCase();
          const lastNameB = b.lastNameP.toLowerCase();
          if (lastNameA < lastNameB) return -1;
          if (lastNameA > lastNameB) return 1;
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

const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
};

const mapearGenero = (codigo) => {
  switch (codigo) {
    case "M":
      return "Masculino";
    case "F":
      return "Femenino";
    default:
      return "";
  }
};

const seleccionarPaciente = async (paciente) => {
  if (!paciente.id) return;

  try {
    const data = await getPacienteById(paciente.id);

    nombre.value = data.nombre || "";
    apellidoP.value = data.apellidoP || "";
    apellidoM.value = data.apellidoM || "";
    genero.value = mapearGenero(data.genero || "");
    edad.value = data.fecha_nacimiento
      ? calcularEdad(data.fecha_nacimiento)
      : null;

    emit("pacienteSeleccionado", {
      id: paciente.id,
      edad: edad.value,
    });

    search.value = `${nombre.value} ${apellidoP.value} ${apellidoM.value}`;
    mostrarLista.value = false;
  } catch (error) {
    console.error("Error al obtener paciente:", error);
  }
};
</script>
