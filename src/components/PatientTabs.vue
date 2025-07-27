<template>
  <div>
    <div class="flex border-b border-gray-200 mb-[4vh]">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 cursor-pointer py-2 text-sm font-medium focus:outline-none',
          activeTab === tab
            ? 'border-b-2 border-[#B22222] text-[#B22222]'
            : 'text-gray-500',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <div v-if="activeTab === 'Citas'">
      <AppointmentsSection :citas="citas" />
    </div>
    <div v-else-if="activeTab === 'Consultas'">
      <PrescriptionsSection :citas="citas" />
    </div>
  </div>
</template>

<script>
import AppointmentsSection from "./AppointmentsSection.vue";
import PrescriptionsSection from "./PrescriptionsSection.vue";

export default {
  name: "PatientTabs",
  components: {
    AppointmentsSection,
    PrescriptionsSection,
  },
  props: {
    citas: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tabs: ["Citas", "Consultas"],
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
