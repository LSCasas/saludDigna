<template>
  <div>
    <Navbar />
    <div class="px-6 py-4 flex justify-between items-center">
      <PacientesHeader :totalPacientes="3" />
      <PacienteSearch />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PacientesHeader from "../components/PacientesHeader.vue";
import PacienteSearch from "../components/PacienteSearch.vue";

export default {
  components: {
    Navbar,
    PacientesHeader,
    PacienteSearch,
  },
};
</script>
