<template>
  <div>
    <div class="flex border-b border-gray-200 mb-[4vh]">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 text-sm font-medium focus:outline-none',
          activeTab === tab
            ? 'border-b-2 border-[#B22222] text-[#B22222]'
            : 'text-gray-500',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <div v-if="activeTab === 'Citas'">
      <CitasSection :citas="citas" />
    </div>
    <div v-else-if="activeTab === 'Filiación'">
      <p class="text-gray-500">Sección de filiación (por implementar).</p>
    </div>
    <div v-else-if="activeTab === 'Presupuestos'">
      <p class="text-gray-500">Sección de presupuestos (por implementar).</p>
    </div>
    <div v-else-if="activeTab === 'Tareas'">
      <p class="text-gray-500">Sección de tareas (por implementar).</p>
    </div>
  </div>
</template>

<script>
import CitasSection from "./CitasSection.vue";

export default {
  name: "PacienteTabs",
  components: {
    CitasSection,
  },
  props: {
    citas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tabs: ["Citas", "Filiación", "Presupuestos", "Tareas"],
      activeTab: "Citas",
    };
  },
};
</script>

<style scoped>
button:hover {
  color: #b22222;
}
</style>
