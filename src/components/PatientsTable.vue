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
          :key="paciente.id_paciente"
          class="border-t border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
          @click="seleccionarPaciente(paciente)"
        >
          <td class="px-4 py-3 flex items-center gap-3">
            <img
              :src="getImagen(paciente)"
              alt="Foto"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div class="font-semibold">
                {{ paciente.nombre }} {{ paciente.apellidoP }}
                {{ paciente.apellidoM }}
              </div>
              <div class="text-xs text-gray-500 capitalize">
                {{ paciente.genero }} •
                {{ calcularEdad(paciente.fecha_nacimiento) }} años
              </div>
            </div>
          </td>
          <td class="px-4 py-3">--</td>
          <td class="px-4 py-3">--</td>
        </tr>
      </tbody>
    </table>

    <!-- Overlay -->
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
      pacientes: [], // ← Llenar con la API en mounted()
      pacienteSeleccionado: null,
    };
  },
  async mounted() {
    try {
      const { getPacientes } = await import("../api/pacientes");
      this.pacientes = await getPacientes();
    } catch (error) {
      // El toast ya maneja el error
    }
  },
  methods: {
    seleccionarPaciente(paciente) {
      this.pacienteSeleccionado = paciente;
    },
    cerrarDrawer() {
      this.pacienteSeleccionado = null;
    },
    calcularEdad(fecha) {
      const nacimiento = new Date(fecha);
      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      return edad;
    },
    getImagen(p) {
      const edad = this.calcularEdad(p.fecha_nacimiento);
      const genero = p.genero.toUpperCase(); // ← Para evitar problemas con minúsculas

      if (edad <= 3) return "/images/baby.png";

      if (edad <= 18) {
        return genero === "M" ? "/images/boy.png" : "/images/girl.png";
      }

      if (edad >= 60) {
        return genero === "M"
          ? "/images/grandfather.png"
          : "/images/grandmother.png";
      }

      return genero === "M" ? "/images/man.png" : "/images/woman.png";
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
