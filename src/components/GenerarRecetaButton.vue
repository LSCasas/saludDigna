<template>
  <button
    @click="$emit('open-prescription')"
    class="flex flex-col items-center p-3 bg-[#F9F9F9] rounded-lg hover:bg-[#f0f0f0] border border-[#D8D8D8] text-[#B22222]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 5h6l4 4v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"
      />
    </svg>
    <span class="text-sm font-medium text-center">Generar receta</span>
  </button>
</template>

<script>
export default {
  name: "GenerarRecetaButton",
};
</script>
