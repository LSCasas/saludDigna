<template>
  <div class="citas-section mt-6 text-sm">
    <div class="overflow-x-auto rounded-md border border-[#D8D8D8]">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#B22222] text-white">
            <th class="p-3">Fecha</th>
            <th class="p-3">Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cita in citas"
            :key="cita.id"
            class="even:bg-[#F9F9F9] odd:bg-white text-gray-800 border-b border-[#D8D8D8]"
          >
            <td class="p-3">{{ cita.fecha }} | {{ cita.hora }}</td>
            <td class="p-3">{{ cita.nombre }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
};
</script>
