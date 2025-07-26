<template>
  <nav
    class="bg-[#F9F9F9] text-[#B22222] px-6 py-4 shadow-md flex justify-between items-center border-b border-[#D8D8D8]"
  >
    <!-- Logo y enlaces -->
    <div class="flex items-center space-x-8">
      <img src="/images/logo.png" alt="Logo" class="h-10 w-auto" />
      <div class="flex space-x-6">
        <a href="#" class="hover:underline">Agenda</a>
        <a href="#" class="hover:underline">Pacientes</a>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <FloatingMenu />
    </div>
  </nav>
</template>

<script>
import FloatingMenu from "../components/FloatingMenu.vue";

export default {
  name: "Navbar",
  components: { FloatingMenu },
};
</script>
