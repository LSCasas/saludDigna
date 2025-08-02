<template>
  <div class="flex justify-end mt-4 gap-2">
    <button
      class="px-3 py-1 cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      Anterior
    </button>
    <span class="text-sm text-gray-600 self-center"
      >Página {{ currentPage }} de {{ totalPages }}</span
    >
    <button
      class="px-3 py-1 cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      Siguiente
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  emits: ["update:currentPage"],
};
</script>
