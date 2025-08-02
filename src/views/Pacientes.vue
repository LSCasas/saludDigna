<template>
  <div>
    <Navbar />
    <div class="px-6 py-4 flex justify-between items-center">
      <PatientsHeader />
      <PatientSearch />
    </div>
    <PatientsTable />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PatientsHeader from "../components/PatientsHeader.vue";
import PatientSearch from "../components/PatientSearch.vue";
import PatientsTable from "../components/PatientsTable.vue";

export default {
  components: {
    Navbar,
    PatientsHeader,
    PatientSearch,
    PatientsTable,
  },
};
</script>
