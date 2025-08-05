<template>
  <div class="citas-section mt-6 text-sm">
    <!-- Si hay citas, mostrar la tabla -->
    <div
      v-if="citas && citas.length > 0"
      class="overflow-x-auto rounded-md border border-[#D8D8D8]"
    >
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#B22222] text-white">
            <th class="p-3">Fecha</th>
            <th class="p-3">Motivo</th>
            <th class="p-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cita in citas"
            :key="cita.id"
            class="even:bg-[#F9F9F9] odd:bg-white text-gray-800 border-b border-[#D8D8D8]"
          >
            <td class="p-3">{{ formatFecha(cita.created_at) }}</td>
            <td class="p-3">{{ cita.motivo }}</td>
            <td class="p-3">{{ cita.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Si NO hay citas, mostrar solo el mensaje -->
    <div v-else class="text-gray-500">No hay citas para este paciente.</div>
  </div>
</template>

<script>
export default {
  name: "AppointmentsSection",
  props: {
    citas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatFecha(fecha) {
      if (!fecha) return "";
      const date = new Date(fecha);
      return date.toLocaleString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>
