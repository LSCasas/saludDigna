<template>
  <button
    @click="$emit('open-new-patient')"
    class="flex flex-col items-center p-3 bg-[#F9F9F9] rounded-lg hover:bg-[#f0f0f0] border border-[#D8D8D8] text-[#B22222]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 mb-1"
      fill="none"
      viewBox="0 0 32 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20c0-2.21 3.58-4 6-4s6 1.79 6 4v0"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M24 9v6m-3-3h6"
      />
    </svg>
    <span class="text-sm font-medium text-center">Nuevo paciente</span>
  </button>
</template>

<script>
export default {
  name: "NuevoPacienteButton",
};
</script>
