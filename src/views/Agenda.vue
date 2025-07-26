<template>
  <div>
    <Navbar />
    <CalendarioHeader
      :fechaSeleccionada="fechaSeleccionada"
      @cambiar-fecha="actualizarFecha"
    />
    <CalendarioSemana :fechaSeleccionada="fechaSeleccionada" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import CalendarioHeader from "../components/CalendarioHeader.vue";
import CalendarioSemana from "../components/CalendarioSemana.vue";

export default {
  name: "CalendarioView",
  components: {
    Navbar,
    CalendarioHeader,
    CalendarioSemana,
  },
  data() {
    return {
      fechaSeleccionada: new Date(),
    };
  },
  methods: {
    actualizarFecha(nuevaFecha) {
      this.fechaSeleccionada = nuevaFecha;
    },
  },
};
</script>
