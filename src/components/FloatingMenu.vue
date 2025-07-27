<template>
  <div class="relative" ref="menuContainer">
    <!-- Botón flotante -->
    <button
      @click="toggleMenu"
      class="bg-[#F9F9F9] cursor-pointer text-[#B22222] border border-[#D8D8D8] rounded-full w-10 h-10 shadow-md flex items-center justify-center text-2xl hover:bg-[#f0f0f0]"
    >
      +
    </button>

    <!-- Menú emergente -->
    <div
      v-if="open"
      class="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-[#D8D8D8] p-4 z-50"
    >
      <div class="grid grid-cols-2 gap-4">
        <PatientButton @open-new-patient="openPatientForm" />
        <AppointmentButton @open-appointment="openAppointmentForm" />
        <PrescriptionButton @open-prescription="openPrescriptionForm" />
      </div>
    </div>

    <!-- Modal: Agendar Cita -->
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

    <!-- Modal: Nuevo Paciente -->
    <div
      v-if="showPatientForm"
      class="cdk-overlay-backdrop cdk-overlay-backdrop-showing"
      @click.self="closePatientForm"
    >
      <div
        class="bg-white p-6 rounded-lg w-full max-w-2xl relative m-auto mt-20"
        @click.stop
      >
        <button
          @click="closePatientForm"
          class="absolute top-3 right-3 text-gray-500 hover:text-[#B22222] text-xl"
        >
          ×
        </button>
        <CreateNewPatient />
      </div>
    </div>

    <div
      v-if="showPrescriptionForm"
      class="cdk-overlay-backdrop cdk-overlay-backdrop-showing"
      @click.self="closePrescriptionForm"
    >
      <div
        class="bg-white p-6 rounded-lg w-full max-w-2xl relative m-auto mt-10 max-h-[80vh] overflow-y-auto"
        @click.stop
      >
        <button
          @click="closePrescriptionForm"
          class="absolute top-3 right-3 text-gray-500 hover:text-[#B22222] text-xl"
        >
          ×
        </button>
        <CreatePrescription />
      </div>
    </div>
  </div>
</template>

<script>
import CreateAppointment from "./CreateAppointment.vue";
import CreateNewPatient from "./CreateNewPatient.vue";
import CreatePrescription from "./CreatePrescription.vue";
import PatientButton from "./PatientButton.vue";
import AppointmentButton from "./AppointmentButton.vue";
import PrescriptionButton from "./PrescriptionButton.vue";

export default {
  name: "FloatingMenu",
  components: {
    CreateAppointment,
    CreateNewPatient,
    CreatePrescription,
    PatientButton,
    AppointmentButton,
    PrescriptionButton,
  },
  data() {
    return {
      open: false,
      showAppointmentForm: false,
      showPatientForm: false,
      showPrescriptionForm: false,
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
    openPatientForm() {
      this.showPatientForm = true;
      this.open = false;
    },
    closePatientForm() {
      this.showPatientForm = false;
    },
    openPrescriptionForm() {
      this.showPrescriptionForm = true;
      this.open = false;
    },
    closePrescriptionForm() {
      this.showPrescriptionForm = false;
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
