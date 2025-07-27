<template>
  <div class="bg-[#F9F9F9] max-w-3xl mx-auto p-6 rounded shadow">
    <SectionTitleForm title="Crear nuevo paciente" />
    <PatientForm />
  </div>
</template>

<script setup>
import SectionTitleForm from "./SectionTitleForm.vue";
import PatientForm from "./PatientForm.vue";
</script>
