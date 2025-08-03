<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 mt-4">
    <!-- Subcomponente: Detalles del paciente -->
    <PatientDetails @pacienteSeleccionado="handlePacienteSeleccionado" />

    <!-- Peso -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Peso (kg)</label>
      <input
        v-model="peso"
        type="number"
        step="0.1"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Talla -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Talla (cm)</label>
      <input
        v-model="talla"
        type="number"
        step="0.1"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Frecuencia respiratoria -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Frecuencia respiratoria</label
      >
      <input
        v-model="frecuenciaRespiratoria"
        type="number"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Frecuencia cardíaca -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Frecuencia cardíaca</label
      >
      <input
        v-model="frecuenciaCardiaca"
        type="number"
        min="0"
        placeholder="Ej. 72"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Temperatura -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Temperatura (°C)</label
      >
      <input
        v-model="temperatura"
        type="number"
        step="0.1"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Tensión arterial -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Tensión arterial</label
      >
      <input
        v-model="tensionArterial"
        type="text"
        placeholder="Ej. 120/80"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Alergia -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Alergia</label>
      <input
        v-model="alergia"
        type="text"
        placeholder="Ninguna / Detallar"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Diagnóstico -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Diagnóstico</label>
      <input
        v-model="diagnostico"
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Indicaciones -->
    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700"
        >Indicaciones</label
      >
      <textarea
        v-model="indicaciones"
        rows="4"
        placeholder="Escribe las indicaciones..."
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      ></textarea>
    </div>

    <!-- Botones -->
    <div class="md:col-span-2 flex justify-end gap-2 mt-4">
      <button
        type="button"
        class="px-4 cursor-pointer py-2 rounded border border-[#D8D8D8] text-gray-700 bg-white"
        @click="recargarPagina"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 cursor-pointer py-2 rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
      >
        Guardar receta
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import PatientDetails from "./PatientDetails.vue";
import { createReceta, getRecetaCompletaById } from "../api/recetas.js";
import { pdfReceta } from "../utils/pdfReceta.js";

function recargarPagina() {
  window.location.reload();
}

const idPaciente = ref(null);
const edad = ref(null);
const peso = ref("");
const talla = ref("");
const frecuenciaRespiratoria = ref("");
const frecuenciaCardiaca = ref("");
const temperatura = ref("");
const tensionArterial = ref("");
const alergia = ref("");
const diagnostico = ref("");
const indicaciones = ref("");
const genero = ref("");

const handlePacienteSeleccionado = ({
  id,
  edad: edadPaciente,
  genero: gen,
}) => {
  idPaciente.value = id;
  edad.value = edadPaciente;
  genero.value = gen;
};

const handleSubmit = async () => {
  if (!idPaciente.value) {
    alert("Selecciona un paciente antes de guardar la receta.");
    return;
  }

  const recetaData = {
    id_paciente: idPaciente.value,
    fecha_receta: new Date().toISOString().split("T")[0],
    edad: edad.value,
    peso: peso.value?.toString() || null,
    talla: talla.value?.toString() || null,
    frecuencia_respiratoria: frecuenciaRespiratoria.value?.toString() || null,
    frecuencia_cardiaca: frecuenciaCardiaca.value?.toString() || null,
    temperatura: temperatura.value?.toString() || null,
    tension_arterial: tensionArterial.value || null,
    alergia: alergia.value || null,
    diagnostico: diagnostico.value || "",
    indicaciones: indicaciones.value || null,
  };

  try {
    const nuevaReceta = await createReceta(recetaData);
    const recetaCompleta = await getRecetaCompletaById(nuevaReceta.id_receta);

    pdfReceta(recetaCompleta);
    window.location.reload();
  } catch (error) {
    console.error("Error al guardar receta", error);
  }
};
</script>
