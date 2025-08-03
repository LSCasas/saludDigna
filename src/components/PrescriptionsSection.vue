<template>
  <div class="recetas-section mt-6 text-sm">
    <!-- Mostrar mensaje mientras carga -->
    <div v-if="loading" class="text-gray-500">Cargando historial...</div>

    <!-- Mostrar tabla si NO está cargando y hay recetas -->
    <div
      v-else-if="recetas.length"
      class="overflow-x-auto rounded-md border border-[#D8D8D8]"
    >
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#B22222] text-white">
            <th class="p-3">Fecha</th>
            <th class="p-3">Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="receta in recetas"
            :key="receta.id_receta"
            class="even:bg-[#F9F9F9] odd:bg-white text-gray-800 border-b border-[#D8D8D8] cursor-pointer hover:bg-gray-200"
            @click="handleClickReceta(receta.id_receta)"
          >
            <td class="p-3">{{ receta.fecha_receta }}</td>
            <td class="p-3">{{ nombreCompleto }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mostrar mensaje si NO está cargando y NO hay recetas -->
    <p v-else class="text-gray-500">No hay recetas para este paciente.</p>
  </div>
</template>

<script>
import { getRecetasPorPaciente, getRecetaCompletaById } from "../api/recetas";
import { pdfReceta } from "../utils/pdfReceta";

export default {
  name: "PrescriptionsSection",
  props: {
    idPaciente: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      recetas: [],
      paciente: null,
      loading: true,
    };
  },
  computed: {
    nombreCompleto() {
      if (!this.paciente) return "";
      return `${this.paciente.nombre} ${this.paciente.apellidoP} ${this.paciente.apellidoM}`;
    },
  },
  async mounted() {
    try {
      const response = await getRecetasPorPaciente(this.idPaciente);
      this.paciente = response.paciente;
      this.recetas = response.recetas || [];
    } catch (error) {
      console.error("Error al cargar recetas:", error);
      this.recetas = [];
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async handleClickReceta(idReceta) {
      try {
        const recetaCompleta = await getRecetaCompletaById(idReceta);
        pdfReceta(recetaCompleta);
      } catch (error) {
        console.error("Error al obtener receta completa:", error);
      }
    },
  },
};
</script>
