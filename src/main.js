import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import axios from "axios";

import "@/assets/main.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const app = createApp(App);

axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
app.use(Toast);
app.use(router);

app.mount("#app");

