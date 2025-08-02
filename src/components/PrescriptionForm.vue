<template>
  <form class="space-y-6 mt-4">
    <!-- Subcomponente: Detalles del paciente -->
    <PatientDetails />

    <!-- Alergia -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Alergia</label>
      <input
        type="text"
        placeholder="Ninguna / Detallar"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Tensión arterial -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Tensión arterial</label
      >
      <input
        type="text"
        placeholder="Ej. 120/80"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Frecuencia cardíaca -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Frecuencia cardíaca</label
      >
      <input
        type="number"
        min="0"
        placeholder="Ej. 72"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Frecuencia respiratoria -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Frecuencia respiratoria</label
      >
      <input
        type="number"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Temperatura -->
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Temperatura (°C)</label
      >
      <input
        type="number"
        step="0.1"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Peso -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Peso (kg)</label>
      <input
        type="number"
        step="0.1"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Talla -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Talla (cm)</label>
      <input
        type="number"
        step="0.1"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Diagnóstico -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Diagnóstico</label>
      <input
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      />
    </div>

    <!-- Indicaciones -->
    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700"
        >Indicaciones</label
      >
      <textarea
        rows="4"
        placeholder="Escribe las indicaciones..."
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 text-gray-800"
      ></textarea>
    </div>

    <!-- Botones -->
    <div class="md:col-span-2 flex justify-end gap-2 mt-4">
      <button
        type="button"
        class="px-4 py-2 rounded border border-[#D8D8D8] text-gray-700 bg-white"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 py-2 rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
      >
        Guardar receta
      </button>
    </div>
  </form>
</template>

<script setup>
import PatientDetails from "./PatientDetails.vue";
</script>
