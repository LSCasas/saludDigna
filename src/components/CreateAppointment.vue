<template>
  <div class="bg-[#F9F9F9] max-w-2xl mx-auto p-6 rounded shadow">
    <SectionTitleForm title="Crear una cita" />
    <AppointmentForm />
  </div>
</template>

<script setup>
import SectionTitleForm from "./SectionTitleForm.vue";
import AppointmentForm from "./AppointmentForm.vue";
</script>
