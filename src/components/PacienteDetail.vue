<template>
  <div class="p-6 max-w-5xl mx-auto">
    <PacienteInfo :paciente="paciente" />
    <PacienteTabs :citas="paciente.citas" />
  </div>
</template>

<script>
import PacienteInfo from "./PacienteInfo.vue";
import PacienteTabs from "./PacienteTabs.vue";

export default {
  name: "PacienteDetail",
  components: {
    PacienteInfo,
    PacienteTabs,
  },
  data() {
    return {
      paciente: {
        imagen: "https://app.doctoqliq.com/img/avatars/hombre1.jpg",
        nombre: "Homero",
        edad: 25,
        telefono: "5642459288",
        citas: [
          {
            id: 1,
            fecha: "28 jul 2025",
            hora: "13:22h",
            motivo: "Consulta",
            estado: "Por confirmar",
          },
          {
            id: 2,
            fecha: "27 jul 2025",
            hora: "11:00h",
            motivo: "Tratamiento en curso",
            estado: "Por confirmar",
          },
          {
            id: 3,
            fecha: "26 jul 2025",
            hora: "13:16h",
            motivo: "Consulta",
            estado: "Por confirmar",
          },
          {
            id: 4,
            fecha: "26 jul 2025",
            hora: "11:00h",
            motivo: "Procedimiento",
            estado: "Confirmada",
          },
        ],
      },
    };
  },
};
</script>
