<template>
  <div class="relative w-full max-w-xs">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Nombre, apellido, doc., tlf..."
      class="w-full px-4 py-2 pr-10 text-sm border border-[#D8D8D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B22222]"
    />
    <span
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B22222]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: "PatientSearch",
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>
