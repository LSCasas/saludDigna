<template>
  <div class="citas-section mt-6">
    <h3 class="font-semibold mb-2">Citas</h3>
    <table class="w-full border-collapse text-left">
      <thead>
        <tr class="bg-blue-600 text-white">
          <th class="p-2">Fecha</th>
          <th class="p-2">Motivo</th>
          <th class="p-2">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cita in citas" :key="cita.id" class="border-b">
          <td class="p-2">{{ cita.fecha }} | {{ cita.hora }}</td>
          <td class="p-2">{{ cita.motivo }}</td>
          <td class="p-2">
            <span v-if="cita.estado === 'Confirmada'" class="text-green-600"
              >✔ Confirmada</span
            >
            <span v-else>Por confirmar</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CitasSection",
  props: {
    citas: {
      type: Array,
      required: true,
    },
  },
};
</script>
