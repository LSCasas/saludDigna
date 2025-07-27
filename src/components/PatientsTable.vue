<template>
  <div class="px-6 relative">
    <table
      class="w-full border border-gray-300 rounded-lg overflow-hidden text-sm"
    >
      <thead class="bg-gray-100 text-red-700 text-left">
        <tr>
          <th class="px-4 py-3">Paciente</th>
          <th class="px-4 py-3">Última cita</th>
          <th class="px-4 py-3">Próxima cita</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr
          v-for="paciente in pacientes"
          :key="paciente.id"
          class="border-t border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
          @click="seleccionarPaciente(paciente)"
        >
          <td class="px-4 py-3 flex items-center gap-3">
            <img
              :src="paciente.imagen"
              alt="Foto"
              class="w-10 h-10 rounded-full object-cover"
            />
            <span>{{ paciente.nombre }}</span>
          </td>
          <td class="px-4 py-3">{{ paciente.ultimaCita }}</td>
          <td class="px-4 py-3">{{ paciente.proximaCita }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Overlay estilo cdk-backdrop -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="pacienteSeleccionado"
        class="cdk-overlay-backdrop cdk-overlay-backdrop-showing"
        @click.self="cerrarDrawer"
      ></div>
    </transition>

    <!-- Drawer lateral -->
    <!-- Drawer lateral -->
    <transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="pacienteSeleccionado"
        class="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl p-6 z-50"
      >
        <PatientDetail />
      </div>
    </transition>
  </div>
</template>

<script>
import PatientDetail from "./PatientDetail.vue";

export default {
  name: "PatientsTable",
  components: { PatientDetail },
  data() {
    return {
      pacientes: [
        {
          id: 1,
          nombre: "Laura Hernández",
          imagen: "https://randomuser.me/api/portraits/women/44.jpg",
          ultimaCita: "20 jul 2025",
          proximaCita: "27 jul 2025",
        },
        {
          id: 2,
          nombre: "Carlos Méndez",
          imagen: "https://randomuser.me/api/portraits/men/32.jpg",
          ultimaCita: "19 jul 2025",
          proximaCita: "28 jul 2025",
        },
        {
          id: 3,
          nombre: "Diana Ruiz",
          imagen: "https://randomuser.me/api/portraits/women/65.jpg",
          ultimaCita: "15 jul 2025",
          proximaCita: "--",
        },
      ],
      pacienteSeleccionado: null,
    };
  },
  methods: {
    seleccionarPaciente(paciente) {
      this.pacienteSeleccionado = paciente;
    },
    cerrarDrawer() {
      this.pacienteSeleccionado = null;
    },
  },
};
</script>

<style scoped>
.cdk-overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 40;
}
.cdk-overlay-backdrop-showing {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
