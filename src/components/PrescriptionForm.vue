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
        class="px-4 py-2 rounded border border-[#D8D8D8] text-gray-700 bg-white"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 py-2 rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
      >
        Guardar receta
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { jsPDF } from "jspdf";
import PatientDetails from "./PatientDetails.vue";
import { createReceta, getRecetaCompletaById } from "../api/recetas.js";

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

const handlePacienteSeleccionado = ({ id, edad: edadPaciente }) => {
  idPaciente.value = id;
  edad.value = edadPaciente;
};

const generarPDF = (data) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("Receta Médica", 105, 15, null, null, "center");

  // Datos Paciente
  doc.setFontSize(14);
  doc.text("Datos del Paciente:", 10, 30);
  doc.setFontSize(12);
  doc.text(`Nombre: ${data.paciente.nombre}`, 10, 40);
  doc.text(`Apellido Paterno: ${data.paciente.apellidoP}`, 10, 48);
  doc.text(`Apellido Materno: ${data.paciente.apellidoM}`, 10, 56);

  // Datos Receta
  doc.setFontSize(14);
  doc.text("Datos de la Receta:", 10, 70);
  doc.setFontSize(12);
  let y = 78;
  const salto = 8;

  const campos = [
    { label: "Fecha receta", value: data.receta.fecha_receta },
    { label: "Edad", value: data.receta.edad },
    { label: "Peso (kg)", value: data.receta.peso },
    { label: "Talla (cm)", value: data.receta.talla },
    {
      label: "Frecuencia respiratoria",
      value: data.receta.frecuencia_respiratoria,
    },
    { label: "Frecuencia cardíaca", value: data.receta.frecuencia_cardiaca },
    { label: "Temperatura (°C)", value: data.receta.temperatura },
    { label: "Tensión arterial", value: data.receta.tension_arterial },
    { label: "Alergia", value: data.receta.alergia },
    { label: "Diagnóstico", value: data.receta.diagnostico },
    { label: "Indicaciones", value: data.receta.indicaciones },
  ];

  campos.forEach(({ label, value }) => {
    doc.text(`${label}: ${value ?? "-"}`, 10, y);
    y += salto;
  });

  doc.save(`Receta_${data.paciente.nombre}_${data.paciente.apellidoP}.pdf`);
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

    generarPDF(recetaCompleta);

    window.location.reload();
  } catch (error) {
    console.error("Error al guardar receta", error);
  }
};
</script>
