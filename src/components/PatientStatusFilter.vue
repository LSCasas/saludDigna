<template>
  <div class="relative">
    <button
      @click="show = !show"
      class="flex items-center cursor-pointer gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
    >
      {{ selected }}
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-if="show"
      class="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded shadow text-xs z-10"
    >
      <ul>
        <li v-for="option in filteredOptions" :key="option">
          <a
            href="#"
            class="block px-3 py-1 hover:bg-gray-100"
            @click.prevent="select(option)"
          >
            {{ option }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientStatusFilter",
  data() {
    return {
      selected: "Activos",
      show: false,
      options: ["Activos", "Inactivos"],
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter((opt) => opt !== this.selected);
    },
  },
  methods: {
    select(option) {
      this.selected = option;
      this.show = false;
    },
  },
};
</script>
