<template>
  <div v-if="paciente" class="p-6 max-w-5xl mx-auto">
    <PatientInfo :paciente="paciente" />
    <PatientTabs :citas="paciente.citas || []" />
  </div>
</template>

<script>
import PatientInfo from "./PatientInfo.vue";
import PatientTabs from "./PatientTabs.vue";

export default {
  name: "PatientDetail",
  props: {
    paciente: {
      type: Object,
      required: true,
    },
  },
  components: {
    PatientInfo,
    PatientTabs,
  },
};
</script>
