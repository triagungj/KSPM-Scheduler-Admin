<script>
import router from "@/router";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

function loadingStart() {
  document.getElementById("loginText").classList.add("d-none");
  document.getElementById("loadingSpinner").classList.remove("d-none");
}
function loadingFinish() {
  document.getElementById("loginText").classList.remove("d-none");
  document.getElementById("loadingSpinner").classList.add("d-none");
}

export default {
  data() {
    return {
      username: "",
      password: "",
      success: false,
    };
  },

  methods: {
    postLogin: async function () {
      const body = { username: this.username, password: this.password };
      loadingStart();
      axios
        .post("/login", body)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("user-token", token);
          axios.defaults.headers.common["Authorization"] = token;
          loadingFinish();
          router.push("/");
        })
        .catch((error) => {
          loadingFinish();
          toast.error(error.response["statusText"], {
            timeout: 2000,
          });
        });
      console.log(body);
    },
  },
};
</script>
<template>
  <body>
    <div class="container">
      <div class="row justify-content-center align-middle">
        <div class="col-lg-5">
          <form
            v-on:submit.prevent="postLogin()"
            method="POST"
            class="text-center bg-light content"
          >
            <img
              alt="App logo"
              class="mb-4"
              src="@/assets/AppLogo.png"
              height="150"
            />

            <div class="mb-3 login-text-input">
              <input
                type="string"
                class="form-control"
                id="inputUsername"
                placeholder="Username"
                v-model="username"
              />
            </div>
            <div class="mb-3 login-text-input">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100 p-2">
              <div id="loginText" class="login-text">Login</div>
              <div
                id="loadingSpinner"
                class="spinner-border text-light d-none"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  background-color: #6750a4;
}

.content {
  padding: 40px;
  border-radius: 12px;
  top: 25%;
}
</style>
