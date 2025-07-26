<template>
  <div>
    <Navbar />
    <CalendarioHeader />
    <CalendarioSemana />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import CalendarioHeader from "../components/CalendarioHeader.vue";
import CalendarioSemana from "../components/CalendarioSemana.vue";

export default {
  components: {
    Navbar,
    CalendarioHeader,
    CalendarioSemana,
  },
};
</script>
