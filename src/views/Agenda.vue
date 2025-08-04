<template>
  <div class="relative">
    <Navbar />
    <CalendarioHeader
      :fechaSeleccionada="fechaSeleccionada"
      @cambiar-fecha="actualizarFecha"
    />
    <CalendarioSemana
      :fechaSeleccionada="fechaSeleccionada"
      @editar-cita="abrirModalCita"
    />

    <!-- Modal: Formulario de cita -->
    <div
      v-if="mostrarModalCita"
      class="cdk-overlay-backdrop cdk-overlay-backdrop-showing"
      @click.self="cerrarModalCita"
    >
      <div
        class="bg-white p-6 rounded-lg w-full max-w-2xl relative m-auto mt-10 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Botón cerrar -->
        <button
          @click="cerrarModalCita"
          class="absolute top-3 right-3 text-gray-500 hover:text-[#B22222] text-3xl cursor-pointer"
        >
          ×
        </button>

        <!-- Formulario de edición -->
        <AppointmentForm
          :cita="citaSeleccionada"
          @guardado="cerrarModalCita"
          @cancelar="cerrarModalCita"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import CalendarioHeader from "../components/CalendarioHeader.vue";
import CalendarioSemana from "../components/CalendarioSemana.vue";
import AppointmentForm from "../components/AppointmentForm.vue";

export default {
  name: "CalendarioView",
  components: {
    Navbar,
    CalendarioHeader,
    CalendarioSemana,
    AppointmentForm,
  },
  data() {
    return {
      fechaSeleccionada: new Date(),
      mostrarModalCita: false,
      citaSeleccionada: null,
    };
  },
  methods: {
    actualizarFecha(nuevaFecha) {
      this.fechaSeleccionada = nuevaFecha;
    },
    abrirModalCita(cita) {
      this.citaSeleccionada = cita;
      this.mostrarModalCita = true;
    },
    cerrarModalCita() {
      this.citaSeleccionada = null;
      this.mostrarModalCita = false;
    },
  },
};
</script>

<style scoped>
.cdk-overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 1rem;
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
