<template>
  <div class="px-6">
    <table
      class="w-full border border-[#D8D8D8] rounded-lg overflow-hidden text-sm"
    >
      <thead class="bg-[#F9F9F9] text-[#B22222] text-left">
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
          class="border-t border-[#D8D8D8]"
        >
          <td class="px-4 py-3 flex items-center space-x-3">
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
  </div>
</template>

<script>
export default {
  name: "PacientesTabla",
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
    };
  },
};
</script>
