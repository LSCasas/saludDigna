<template>
  <form class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Paciente</label
      >
      <div class="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar paciente"
          class="w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        />
        <button
          type="button"
          class="px-3 py-2 rounded bg-[#B22222] text-white hover:bg-[#911c1c] text-sm"
        >
          Agregar paciente
        </button>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Nombre</label>
      <input
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>
    <div class="flex gap-2">
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700"
          >Apellido Paterno</label
        >
        <input
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
        />
      </div>
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700"
          >Apellido Materno</label
        >
        <input
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Género</label>
      <select
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      >
        <option>Hombre</option>
        <option>Mujer</option>
        <option>Otro</option>
        <option>Prefiero no decir</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Edad</label>
      <input
        type="number"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Fecha receta</label
      >
      <input
        type="date"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Diagnóstico</label>
      <input
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Tensión arterial</label
      >
      <input
        type="text"
        placeholder="Ej. 120/80"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Frecuencia cardíaca</label
      >
      <input
        type="number"
        min="0"
        placeholder="Ej. 72"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Frecuencia respiratoria</label
      >
      <input
        type="number"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Temperatura (°C)</label
      >
      <input
        type="number"
        step="0.1"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Peso (kg)</label>
      <input
        type="number"
        step="0.1"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Talla (cm)</label>
      <input
        type="number"
        step="0.1"
        min="0"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Alergia</label>
      <input
        type="text"
        placeholder="Ninguna / Detallar"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      />
    </div>

    <div class="md:col-span-2">
      <label class="block text-sm font-medium text-gray-700"
        >Indicaciones</label
      >
      <textarea
        rows="4"
        placeholder="Escribe las indicaciones..."
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-[#B22222]"
      ></textarea>
    </div>

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

<script setup></script>
