<template>
  <div class="relative" ref="menuContainer">
    <button
      @click="toggleMenu"
      class="bg-[#F9F9F9] text-[#B22222] border border-[#D8D8D8] rounded-full w-10 h-10 shadow-md flex items-center justify-center text-2xl hover:bg-[#f0f0f0]"
    >
      +
    </button>

    <div
      v-if="open"
      class="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-[#D8D8D8] p-4 z-50"
    >
      <div class="grid grid-cols-2 gap-4">
        <button
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

        <button
          @click="openAppointmentForm"
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
              d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="text-sm font-medium text-center">Agendar cita</span>
        </button>

        <button
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
      </div>
    </div>

    <div
      v-if="showAppointmentForm"
      class="cdk-overlay-backdrop cdk-overlay-backdrop-showing"
      @click.self="closeAppointmentForm"
    >
      <div
        class="bg-white p-6 rounded-lg w-full max-w-2xl relative m-auto mt-20"
        @click.stop
      >
        <button
          @click="closeAppointmentForm"
          class="absolute top-3 right-3 text-gray-500 hover:text-[#B22222] text-xl"
        >
          ×
        </button>
        <CreateAppointment />
      </div>
    </div>
  </div>
</template>

<script>
import CreateAppointment from "./CreateAppointment.vue";

export default {
  name: "FloatingMenu",
  components: {
    CreateAppointment,
  },
  data() {
    return {
      open: false,
      showAppointmentForm: false,
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
    openAppointmentForm() {
      this.showAppointmentForm = true;
      this.open = false;
    },
    closeAppointmentForm() {
      this.showAppointmentForm = false;
    },
    handleClickOutside(event) {
      const menu = this.$refs.menuContainer;
      if (menu && !menu.contains(event.target)) {
        this.open = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.cdk-overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cdk-overlay-backdrop-showing {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
