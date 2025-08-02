<template>
  <form
    class="w-full max-w-md mx-auto mt-24 p-6 bg-[#F9F9F9] border border-[#D8D8D8] rounded-md space-y-5 text-sm"
    @submit.prevent="handleSubmit"
  >
    <h2 class="text-center text-xl font-semibold text-[#B22222]">
      Iniciar sesión
    </h2>

    <div>
      <label for="correo" class="block mb-1 text-gray-700">Correo</label>
      <input
        type="email"
        id="correo"
        v-model="correo"
        required
        class="w-full border border-[#D8D8D8] px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#B22222]"
      />
    </div>

    <div>
      <label for="contraseña" class="block mb-1 text-gray-700"
        >Contraseña</label
      >
      <input
        type="password"
        id="contraseña"
        v-model="contraseña"
        required
        class="w-full border border-[#D8D8D8] px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#B22222]"
      />
    </div>

    <button
      type="submit"
      class="w-full cursor-pointer bg-[#B22222] text-white py-2 rounded hover:bg-red-900 transition-colors"
    >
      Iniciar sesión
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { loginUser } from "../api/auth";

const correo = ref("");
const contraseña = ref("");
const router = useRouter();
const toast = useToast();

const handleSubmit = async () => {
  try {
    await loginUser({ email: correo.value, password: contraseña.value });
    router.push("/pacientes");
  } catch (error) {
    const message = error?.message;
    console.log(message);
  }
};
</script>
