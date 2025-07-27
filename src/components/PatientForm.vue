<template>
  <form class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Nombres<span class="text-red-500">*</span></label
      >
      <input
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      />
    </div>

    <div class="flex gap-2">
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700"
          >Apellido paterno<span class="text-red-500">*</span></label
        >
        <input
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        />
      </div>
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700"
          >Apellido materno</label
        >
        <input
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Teléfono<span class="text-red-500">*</span></label
      >
      <div class="flex items-center gap-2">
        <input
          type="tel"
          class="w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
          placeholder="+52"
        />
      </div>
      <div class="mt-1">
        <label class="inline-flex items-center text-sm text-gray-600">
          <input type="checkbox" class="form-checkbox text-[#B22222]" />
          <span class="ml-2">No tiene</span>
        </label>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >F. nacimiento</label
      >
      <input
        type="date"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Género</label>
      <select
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#B22222]"
      >
        <option>Hombre</option>
        <option>Mujer</option>
        <option>Otro</option>
        <option>Prefiero no decir</option>
      </select>
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
        Crear
      </button>
    </div>
  </form>
</template>

<script setup></script>
