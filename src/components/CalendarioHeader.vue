<template>
  <div class="flex items-center gap-4 px-6 py-4">
    <button
      class="bg-white border border-[#D8D8D8] p-2 rounded-md text-[#B22222] hover:bg-[#F9F9F9]"
    >
      <i class="fas fa-calendar-alt"></i>
    </button>
    <button
      class="bg-[#B22222] text-white px-4 py-2 rounded-md hover:opacity-90"
    >
      Hoy
    </button>
    <span class="text-gray-700 font-medium">
      {{ fechaInicio }} - {{ fechaFin }}
    </span>
  </div>
</template>

<script>
export default {
  name: "CalendarioHeader",
  data() {
    return {
      fechaInicio: "04 ago 2025",
      fechaFin: "11 ago 2025",
    };
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
</style>
