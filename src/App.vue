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
.bg-custom-primary {
  background-color: #6750a4;
}
a {
  text-decoration: none;
}
.btn-add {
  border-radius: 8px;
  padding: 12px 20px;
  background-color: #6750a4;
  transition: 0.5s;
}
.btn-add:hover {
  background-color: #604be6;
}
</style>
