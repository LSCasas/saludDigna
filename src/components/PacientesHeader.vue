<template>
  <div class="flex items-center justify-between pb-4">
    <h2 class="text-lg text-[#1F2937] font-semibold">
      Todos los pacientes
      <span class="text-[#6B7280]">| {{ totalPacientes }} pacientes</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "PacientesHeader",
  props: {
    totalPacientes: {
      type: Number,
      default: 0,
    },
  },
};
</script>
