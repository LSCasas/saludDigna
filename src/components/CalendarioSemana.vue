<template>
  <div class="overflow-x-auto px-6 pb-6">
    <table class="min-w-full border border-[#D8D8D8] text-sm">
      <thead class="bg-[#F9F9F9] text-[#B22222]">
        <tr>
          <th class="w-24 px-4 py-2 text-left">Hora</th>
          <th
            v-for="(dia, index) in diasSemana"
            :key="index"
            class="px-4 py-2 text-left"
          >
            {{ dia.nombre }}<br />
            <span class="text-xs text-gray-500">{{ dia.fecha }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hora in horas" :key="hora">
          <td class="border-t border-[#D8D8D8] px-4 py-2 text-gray-600">
            {{ hora }}
          </td>
          <td
            v-for="i in 7"
            :key="i"
            class="border-t border-[#D8D8D8] h-12 bg-white hover:bg-[#F9F9F9]"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { startOfWeek, addDays, format } from "date-fns";
import { es } from "date-fns/locale";

export default {
  name: "CalendarioSemana",
  props: {
    fechaSeleccionada: {
      type: Date,
      required: true,
    },
  },
  computed: {
    diasSemana() {
      const inicio = startOfWeek(this.fechaSeleccionada, { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => {
        const fecha = addDays(inicio, i);
        return {
          nombre: format(fecha, "EEEE", { locale: es }),
          fecha: format(fecha, "dd", { locale: es }),
        };
      });
    },
  },
  data() {
    return {
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
};
</script>
