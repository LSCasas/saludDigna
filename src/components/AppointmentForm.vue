<template>
  <form class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Paciente</label>
      <input
        type="text"
        placeholder="Buscar paciente"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      />

      <div class="flex items-center mt-2 text-sm text-gray-700">
        <input
          id="new-patient"
          type="radio"
          name="patientOption"
          class="text-[#B22222] focus:ring-[#B22222] border-[#D8D8D8] mr-2"
        />
        <label for="new-patient" class="cursor-pointer">Agregar paciente</label>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Motivo</label>
      <select
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      >
        <option>Consulta</option>
        <option>Procedimiento</option>
        <option>Tratamiento en curso</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Fecha</label>
      <input
        type="date"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Hora inicio</label>
      <input
        type="time"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      />
    </div>

    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700"
        >Nota de la cita</label
      >
      <textarea
        rows="3"
        placeholder="Escribe aquí..."
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      ></textarea>
    </div>

    <div class="md:col-span-2 flex justify-end gap-2 mt-4">
      <button
        type="button"
        class="px-4 cursor-pointer py-2 rounded border border-[#D8D8D8] text-gray-700 bg-white"
        @click="recargarPagina"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 cursor-pointer py-2 rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
      >
        Guardar
      </button>
    </div>
  </form>
</template>

<script setup>
function recargarPagina() {
  window.location.reload();
}
</script>
