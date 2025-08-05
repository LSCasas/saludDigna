<template>
  <button
    @click="handleLogout"
    class="flex cursor-pointer flex-col items-center p-3 bg-[#F9F9F9] rounded-lg hover:bg-[#f0f0f0] border border-[#D8D8D8] text-[#B22222]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V5m-6 4v6"
      />
    </svg>
    <span class="text-sm font-medium text-center">Cerrar sesión</span>
  </button>
</template>

<script>
import { logoutUser } from "../api/auth";
import { useRouter } from "vue-router";

export default {
  name: "LogoutButton",
  setup() {
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await logoutUser();
        router.push("/");
      } catch (e) {}
    };

    return { handleLogout };
  },
};
</script>
