<template>
  <div class="paciente-info flex items-center space-x-4 mb-[7vh]">
    <img
      :src="paciente.imagen"
      alt="Foto del paciente"
      class="w-16 h-16 rounded-full object-cover"
    />
    <div class="flex flex-col">
      <div class="flex items-center space-x-3">
        <h2 class="text-lg font-semibold">
          {{ paciente.nombre }} {{ paciente.apellidoP }}
          {{ paciente.apellidoM }}
        </h2>
        <button
          @click="$emit('editar')"
          class="text-[#B22222] cursor-pointer bg-[#F9F9F9] border border-[#D8D8D8] rounded px-3 py-1 text-sm hover:bg-[#D8D8D8] transition"
          type="button"
        >
          Editar
        </button>
      </div>
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
