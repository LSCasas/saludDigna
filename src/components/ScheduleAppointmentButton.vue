<template>
  <button
    @click="$emit('open-appointment')"
    class="flex flex-col items-center p-3 bg-[#F9F9F9] rounded-lg hover:bg-[#f0f0f0] border border-[#D8D8D8] text-[#B22222]"
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
        d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
    <span class="text-sm font-medium text-center">Agendar cita</span>
  </button>
</template>

<script>
export default {
  name: "ScheduleAppointmentButton",
};
</script>
