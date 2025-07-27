<template>
  <div class="border-b border-[#D8D8D8] pb-3">
    <h2 class="text-lg font-semibold text-[#B22222]">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
