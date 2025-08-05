<script setup>
import { isLoading } from "./router";
import Loading from "./components/Loading.vue";
</script>

<template>
  <Loading v-if="isLoading" />
  <router-view />
</template>
