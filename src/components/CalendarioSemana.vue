<template>
  <div class="overflow-y-auto px-6 pb-6">
    <table class="min-w-full border border-[#D8D8D8] text-sm table-fixed">
      <thead class="bg-[#F9F9F9] text-[#B22222]">
        <tr>
          <th class="px-4 py-2 text-left w-20"></th>
          <th
            v-for="(dia, index) in diasSemana"
            :key="index"
            class="px-1 py-2 text-left uppercase border-l border-[#D8D8D8]"
          >
            {{ dia.inicial }}<br />
            <span class="text-xs text-gray-500">{{ dia.fecha }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="hora in horas"
          :key="hora"
          class="border-t border-[#D8D8D8] h-20"
        >
          <td
            class="px-4 py-1 text-gray-600 border-r border-[#D8D8D8] align-top"
          >
            {{ hora }}
          </td>
          <td
            v-for="(dia, i) in diasSemana"
            :key="i"
            class="border-l border-[#D8D8D8] bg-white hover:bg-[#F9F9F9] relative"
          >
            <div class="h-full relative">
              <!-- Línea media de la hora -->
              <div
                class="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-300 z-0"
              ></div>

              <!-- Mitad superior -->
              <div
                class="absolute top-0 left-0 right-0 h-1/2 px-1 flex flex-col justify-start"
              >
                <div
                  v-for="(cita, index) in getCitasPorDiaYMinuto(
                    dia.fechaCompleta,
                    hora,
                    'inicio'
                  )"
                  :key="'i' + index"
                  :class="[
                    'text-white text-[10px] rounded-sm px-1 truncate cursor-pointer',
                    getColor(cita.estado),
                  ]"
                  :style="getCitaStyle(dia.fechaCompleta, hora, 'inicio')"
                  @click="seleccionarCita(cita.id_cita)"
                >
                  {{ cita.paciente?.nombre }}
                </div>
              </div>

              <!-- Mitad inferior -->
              <div
                class="absolute bottom-0 left-0 right-0 h-1/2 px-1 flex flex-col justify-start"
              >
                <div
                  v-for="(cita, index) in getCitasPorDiaYMinuto(
                    dia.fechaCompleta,
                    hora,
                    'fin'
                  )"
                  :key="'f' + index"
                  :class="[
                    'text-white text-[10px] rounded-sm px-1 truncate cursor-pointer',
                    getColor(cita.estado),
                  ]"
                  :style="getCitaStyle(dia.fechaCompleta, hora, 'fin')"
                  @click="seleccionarCita(cita.id_cita)"
                >
                  {{ cita.paciente?.nombre }}
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { startOfWeek, addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { getRecetasConPaciente } from "../api/citas";

export default {
  name: "CalendarioSemana",
  props: {
    fechaSeleccionada: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      citas: [],
      horas: [
        "7 a. m.",
        "8 a. m.",
        "9 a. m.",
        "10 a. m.",
        "11 a. m.",
        "12 p. m.",
        "1 p. m.",
        "2 p. m.",
        "3 p. m.",
        "4 p. m.",
        "5 p. m.",
        "6 p. m.",
        "7 p. m.",
        "8 p. m.",
        "9 p. m.",
      ],
    };
  },
  computed: {
    diasSemana() {
      const inicio = startOfWeek(this.fechaSeleccionada, { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => {
        const fecha = addDays(inicio, i);
        return {
          inicial: format(fecha, "EEEEE", { locale: es }).toUpperCase(),
          fecha: format(fecha, "dd", { locale: es }),
          fechaCompleta: format(fecha, "yyyy-MM-dd"),
        };
      });
    },
  },
  methods: {
    async cargarCitas() {
      try {
        const data = await getRecetasConPaciente();
        this.citas = data;
      } catch (error) {
        console.error("Error cargando citas:", error);
      }
    },

    formatearHora(hora) {
      let [h] = hora.split(":");
      h = parseInt(h);
      const ampm = h >= 12 ? "p. m." : "a. m.";
      h = h % 12 || 12;
      return `${h} ${ampm}`;
    },

    getColor(estado) {
      return estado === "pendiente"
        ? "bg-[#4386f4]"
        : estado === "atendida"
        ? "bg-[#40b988]"
        : estado === "cancelada"
        ? "bg-[#d85b5c]"
        : "bg-gray-400";
    },

    getCitasPorDiaYMinuto(fecha, horaStr, parte) {
      const [hora12, ampm] = horaStr.split(" ");
      let h = parseInt(hora12);
      if (ampm === "p." && h !== 12) h += 12;
      if (ampm === "a." && h === 12) h = 0;

      return this.citas.filter((c) => {
        if (c.fecha_cita !== fecha) return false;
        const [ch, cm] = c.hora_cita.split(":").map(Number);
        const enHora = ch === h;
        const esMitad = parte === "inicio" ? cm < 30 : cm >= 30;
        return enHora && esMitad;
      });
    },
    getCitaStyle(fecha, hora, parte) {
      const total = this.getCitasPorDiaYMinuto(fecha, hora, parte).length;
      const height = total ? 100 / total : 100;
      return {
        height: `${height}%`,
      };
    },
    seleccionarCita(id) {
      const citaSeleccionada = this.citas.find((c) => c.id_cita === id);
      if (citaSeleccionada) {
        this.$emit("editar-cita", citaSeleccionada);
      }
    },
  },
  watch: {
    fechaSeleccionada: {
      immediate: true,
      handler() {
        this.cargarCitas();
      },
    },
  },
};
</script>

<style scoped>
.table-fixed {
  table-layout: fixed;
}
td {
  height: 80px;
  position: relative;
}
</style>
