<template>
  <div class="paciente-info flex items-center space-x-4 mb-[7vh]">
    <img
      :src="paciente.imagen"
      alt="Foto del paciente"
      class="w-16 h-16 rounded-full"
    />
    <div>
      <h2 class="text-lg font-semibold">{{ paciente.nombre }}</h2>
      <p>{{ paciente.edad }} años</p>
      <p class="text-[#B22222]">{{ paciente.telefono }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientInfo",
  props: {
    paciente: {
      type: Object,
      required: true,
    },
  },
};
</script>
