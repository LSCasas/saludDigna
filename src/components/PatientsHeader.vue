<template>
  <div class="flex items-center justify-between pb-4">
    <h2 class="text-lg text-[#1F2937] font-normal">
      Pacientes
      <span class="text-[#6B7280]">
        | activos · {{ activos }} inactivos · {{ inactivos }}
      </span>
    </h2>
  </div>
</template>

<script>
import {
  countPacientesActivos,
  countPacientesInactivos,
} from "../api/pacientes";

export default {
  name: "PatientsHeader",
  data() {
    return {
      activos: 0,
      inactivos: 0,
    };
  },
  async mounted() {
    try {
      this.activos = await countPacientesActivos();
      this.inactivos = await countPacientesInactivos();
    } catch (error) {
      console.error("Error al obtener conteo de pacientes:", error);
    }
  },
};
</script>
