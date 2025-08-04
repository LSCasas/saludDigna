<template>
  <div class="flex items-center gap-4 px-6 py-4">
    <!-- Botón de selector de fecha -->
    <label
      for="inputFecha"
      class="bg-white border border-[#D8D8D8] p-2 rounded-md text-[#B22222] hover:bg-[#F9F9F9] cursor-pointer"
    >
      <i class="fas fa-calendar-alt"></i>
    </label>

    <input
      id="inputFecha"
      type="date"
      class="border border-[#D8D8D8] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      :value="fechaInput"
      @change="cambiarFecha"
    />

    <!-- Botón Hoy -->
    <button
      class="bg-[#B22222] cursor-pointer text-white px-4 py-2 rounded-md hover:opacity-90"
      @click="irAHoy"
    >
      Hoy
    </button>

    <!-- Rango de la semana -->
    <span class="text-gray-700 font-medium">
      {{ rangoTexto }}
    </span>
  </div>
</template>

<script>
import { format, startOfWeek, endOfWeek } from "date-fns";
import { es } from "date-fns/locale";

export default {
  name: "CalendarioHeader",
  props: {
    fechaSeleccionada: {
      type: Date,
      required: true,
    },
  },
  computed: {
    rangoTexto() {
      const inicio = startOfWeek(this.fechaSeleccionada, { weekStartsOn: 1 });
      const fin = endOfWeek(this.fechaSeleccionada, { weekStartsOn: 1 });
      return `${format(inicio, "dd MMM yyyy", { locale: es })} - ${format(
        fin,
        "dd MMM yyyy",
        { locale: es }
      )}`;
    },
    fechaInput() {
      return format(this.fechaSeleccionada, "yyyy-MM-dd");
    },
  },
  methods: {
    cambiarFecha(event) {
      const nuevaFecha = new Date(event.target.value);
      if (!isNaN(nuevaFecha)) {
        this.$emit("cambiar-fecha", nuevaFecha);
      }
    },
    irAHoy() {
      this.$emit("cambiar-fecha", new Date());
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
</style>
