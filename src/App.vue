<script setup>
import { RouterView } from "vue-router";
import router from "@/router";
const token = localStorage.getItem("user-token");
if (token != null) {
  router.push("/");
} else {
  router.push("/login");
}
</script>
<template>
  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
