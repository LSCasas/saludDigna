<template>
  <div class="recetas-section mt-6 text-sm">
    <div
      v-if="recetas.length"
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
            class="even:bg-[#F9F9F9] odd:bg-white text-gray-800 border-b border-[#D8D8D8]"
          >
            <td class="p-3">{{ receta.fecha_receta }}</td>
            <td class="p-3">{{ receta.nombre_paciente }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-gray-500">No hay recetas para este paciente.</p>
  </div>
</template>

<script>
import { getRecetasPorPaciente } from "../api/recetas";

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
    };
  },
  async mounted() {
    try {
      const response = await getRecetasPorPaciente(this.idPaciente);
      const { paciente, recetas } = response;

      const nombreCompleto = `${paciente.nombre} ${paciente.apellidoP} ${paciente.apellidoM}`;

      this.recetas = recetas.map((receta) => ({
        ...receta,
        nombre_paciente: nombreCompleto,
      }));
    } catch (error) {
      console.error("Error al cargar recetas:", error);
    }
  },
};
</script>
