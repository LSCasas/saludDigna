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
const genero = ref("");

const azul = "#0e85ad";

const handlePacienteSeleccionado = ({
  id,
  edad: edadPaciente,
  genero: gen,
}) => {
  idPaciente.value = id;
  edad.value = edadPaciente;
  genero.value = gen;
};

const generarPDF = (data) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [216, 140],
  });

  const azul = "#0e85ad";
  const negro = "#000000";

  // Logos
  doc.addImage("/images/logoipn.png", "PNG", 10, 10, 25, 25);
  doc.addImage("/images/simbolomedicina.png", "PNG", 175, 10, 20, 20);

  // Marca de agua fija centrada
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const mwWidth = 60; // ancho marca de agua
  const mwHeight = 60; // alto marca de agua
  const mwX = (pageWidth - mwWidth) / 2;
  const mwY = (pageHeight - mwHeight) / 2;

  doc.setGState(new doc.GState({ opacity: 0.15 }));
  doc.addImage(
    "/images/simbolomedicina.png",
    "PNG",
    mwX,
    mwY,
    mwWidth,
    mwHeight
  );
  doc.setGState(new doc.GState({ opacity: 1 }));

  // Encabezado
  doc.setTextColor(azul);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("CONSULTORIO MEDICO", 105, 12, null, null, "center");
  doc.setFontSize(11);
  doc.text("Dra. Anabel Sánchez Guadarrama", 105, 18, null, null, "center");
  doc.setFont("helvetica", "normal");
  doc.text("Médico Cirujano y Partero", 105, 23, null, null, "center");
  doc.text("CED. PROF. 9768898", 105, 28, null, null, "center");

  // Nombre del paciente y fecha
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(azul);
  doc.text("Nombre del Paciente:", 10, 42);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(negro);
  doc.text(
    `${data.paciente.nombre} ${data.paciente.apellidoP} ${data.paciente.apellidoM}`,
    60,
    42
  );
  doc.line(58, 43, 160, 43);

  doc.setTextColor(azul);
  doc.text("Fecha:", 165, 42);
  doc.setTextColor(negro);
  doc.text(`${data.receta.fecha_receta}`, 180, 42);
  doc.line(179, 43, 210, 43);

  // Datos verticales (izquierda)
  const vertical = [
    ["Edad", `${data.receta.edad ?? "-"}`],
    ["I.D.", `${data.paciente.genero ?? "-"}`],
    ["Peso", `${data.receta.peso ?? "-"} kg`],
    ["Talla", `${data.receta.talla ?? "-"} cm`],
    ["FR", `${data.receta.frecuencia_respiratoria ?? "-"}`],
    ["FC", `${data.receta.frecuencia_cardiaca ?? "-"}`],
    ["Temp.", `${data.receta.temperatura ?? "-"}°C`],
    ["T/A", `${data.receta.tension_arterial ?? "-"}`],
    ["Alergias", `${data.receta.alergia ?? "-"}`],
    ["DX", `${data.receta.diagnostico ?? "-"}`],
  ];

  let y = 50;
  for (const [titulo, valor] of vertical) {
    doc.setTextColor(azul);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${titulo}:`, 10, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.setFontSize(11);
    doc.text(valor, 30, y);
    doc.line(29, y + 1, 70, y + 1);
    y += 7;
  }

  // Indicaciones médicas (lado derecho)
  const indicaciones = data.receta.indicaciones?.split("\n") ?? [];
  let yIndicacion = 50;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(negro);

  for (const linea of indicaciones) {
    if (yIndicacion > 125) break;
    doc.text(linea, 80, yIndicacion);
    yIndicacion += 6;
  }

  // Próxima cita y Nota
  doc.setTextColor(azul);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Próxima cita:", 150, 123);
  doc.line(172, 123, 210, 123);
  doc.setFont("helvetica", "normal");
  doc.text("Nota: Favor de traer receta.", 150, 128);

  // Pie de página
  doc.setFontSize(9);
  doc.setTextColor(azul);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Dirección: Zarzaparrilla, Edo. de Méx, 4 Mz.32, Lt. 23, Hacienda, Coacalco, C.P. 55712",
    10,
    138
  );

  doc.setFont("helvetica", "bold");
  doc.text("Tel: 55-9299-7463", 136, 138);
  doc.text("Firma:", 166, 138);
  doc.line(178, 138, 210, 138);

  // Guardar PDF
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
