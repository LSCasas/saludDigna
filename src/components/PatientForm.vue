<template>
  <form
    @submit.prevent="handleSubmit"
    class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
  >
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Nombres<span class="text-red-500">*</span>
      </label>
      <input
        v-model="form.nombre"
        type="text"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        required
      />
    </div>

    <div class="flex gap-2">
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700">
          Apellido paterno<span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.apellidoP"
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
          required
        />
      </div>
      <div class="w-1/2">
        <label class="block text-sm font-medium text-gray-700"
          >Apellido materno</label
        >
        <input
          v-model="form.apellidoM"
          type="text"
          class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"> Teléfono </label>
      <div class="flex items-center gap-2">
        <input
          v-model="form.telefono"
          type="tel"
          :disabled="noTelefono"
          class="w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
          placeholder="+52"
        />
      </div>
      <div class="mt-1">
        <label
          class="inline-flex items-center text-sm text-gray-600 cursor-pointer"
        >
          <input
            type="checkbox"
            class="form-checkbox text-[#B22222]"
            v-model="noTelefono"
          />
          <span class="ml-2 select-none">No tiene</span>
        </label>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="form.correo"
        type="email"
        :disabled="noEmail"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        :required="!noEmail"
        placeholder="ejemplo@correo.com"
      />
      <div class="mt-1">
        <label
          class="inline-flex items-center text-sm text-gray-600 cursor-pointer"
        >
          <input
            type="checkbox"
            class="form-checkbox text-[#B22222]"
            v-model="noEmail"
          />
          <span class="ml-2 select-none">No tiene</span>
        </label>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >F. nacimiento<span class="text-red-500">*</span></label
      >
      <input
        v-model="form.fecha_nacimiento"
        type="date"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        required
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Género<span class="text-red-500">*</span></label
      >
      <select
        v-model="form.genero"
        class="mt-1 w-full border border-[#D8D8D8] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#B22222]"
        required
      >
        <option value="">Seleccione</option>
        <option value="M">Hombre</option>
        <option value="F">Mujer</option>
      </select>
    </div>

    <div class="md:col-span-2 flex justify-end gap-2 mt-4">
      <button
        type="button"
        class="px-4 cursor-pointer py-2 rounded border border-[#D8D8D8] text-gray-700 bg-white"
        @click="resetForm"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 cursor-pointer py-2 rounded bg-[#B22222] text-white hover:bg-[#911c1c]"
      >
        Crear
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { createPaciente } from "../api/pacientes.js";

const noTelefono = ref(false);
const noEmail = ref(false);

const form = reactive({
  nombre: "",
  apellidoP: "",
  apellidoM: "",
  telefono: "",
  correo: "",
  fecha_nacimiento: "",
  genero: "",
});

const resetForm = () => {
  form.nombre = "";
  form.apellidoP = "";
  form.apellidoM = "";
  form.telefono = "";
  form.correo = "";
  form.fecha_nacimiento = "";
  form.genero = "";
  noTelefono.value = false;
  noEmail.value = false;
};

watch(noTelefono, (val) => {
  if (val) {
    form.telefono = "";
  }
});

watch(noEmail, (val) => {
  if (val) {
    form.correo = "";
  }
});

const handleSubmit = async () => {
  try {
    const payload = {
      nombre: form.nombre,
      apellidoP: form.apellidoP,
      apellidoM: form.apellidoM || null,
      telefono: noTelefono.value ? null : form.telefono || null,
      correo: noEmail.value ? null : form.correo || null,
      fecha_nacimiento: form.fecha_nacimiento,
      genero: form.genero,
    };

    await createPaciente(payload);
    resetForm();
  } catch (error) {}
};
</script>
