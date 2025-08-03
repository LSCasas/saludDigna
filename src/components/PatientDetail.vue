<template>
  <div v-if="paciente">
    <PatientInfo :paciente="paciente" @editar="modoEdicion = true" />

    <!-- Mostrar formulario sólo si modoEdicion es true -->
    <PatientForm
      v-if="modoEdicion"
      :paciente="paciente"
      @cancelar="modoEdicion = false"
      @guardado="handlePacienteActualizado"
    />

    <PatientTabs :citas="paciente.citas" :paciente="paciente" />
  </div>
</template>

<script>
import PatientInfo from "./PatientInfo.vue";
import PatientForm from "./PatientForm.vue";
import PatientTabs from "./PatientTabs.vue";

export default {
  components: { PatientInfo, PatientForm, PatientTabs },
  props: { paciente: Object },
  data() {
    return {
      modoEdicion: false,
    };
  },
  methods: {
    handlePacienteActualizado(nuevosDatos) {
      this.modoEdicion = false;
      Object.assign(this.paciente, nuevosDatos);
    },
  },
};
</script>
