<template>
  <div class="p-6 max-w-5xl mx-auto">
    <PatientInfo :paciente="paciente" />
    <PatientTabs :citas="paciente.citas" />
  </div>
</template>

<script>
import PatientInfo from "./PatientInfo.vue";
import PatientTabs from "./PatientTabs.vue";

export default {
  name: "PatientDetail",
  components: {
    PatientInfo,
    PatientTabs,
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
            nombre: "Juan Perez",
            motivo: "Consulta",
            estado: "Por confirmar",
          },
          {
            id: 2,
            fecha: "27 jul 2025",
            hora: "11:00h",
            nombre: "Juan Perez",
            motivo: "Tratamiento en curso",
            estado: "Por confirmar",
          },
          {
            id: 3,
            fecha: "26 jul 2025",
            hora: "13:16h",
            nombre: "Juan Perez",
            motivo: "Consulta",
            estado: "Por confirmar",
          },
          {
            id: 4,
            fecha: "26 jul 2025",
            hora: "11:00h",
            nombre: "Juan Perez",
            motivo: "Procedimiento",
            estado: "Confirmada",
          },
        ],
      },
    };
  },
};
</script>
