<template>
  <div class="flex h-screen overflow-hidden">
    <div
      class="py-4 justify-center items-start p-10 flex-[0.9] hidden md:flex"
      style="
        background-image: url('images/inicio.png');
        background-size: cover;
        background-position: center;
      "
    ></div>

    <div class="flex justify-center items-start bg-white p-10 flex-1">
      <div class="w-full max-w-md mt-10">
        <FormularioInicioSesion />
      </div>
    </div>
  </div>
</template>

<script setup>
import FormularioInicioSesion from "../components/FormularioInicioSesion.vue";
</script>
