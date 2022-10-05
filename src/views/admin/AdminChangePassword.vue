<template>
  <Navbar page="admin">
    <template #content>
      <h5>Ubah Password Admin</h5>
      <form
        v-on:submit.prevent="changePassword()"
        method="POST"
        class="row mt-3"
      >
        <div class="col-12 my-1">
          <div class="form-group">
            <label for="inputTitle">Password Lama</label>
            <input
              type="password"
              class="form-control"
              id="inputOldPassword"
              v-model="oldPassword"
            />
          </div>
        </div>
        <div class="col-12 my-1">
          <div class="form-group">
            <label for="inputDescription">Password Baru</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              v-model="newPassword"
              required
            />
          </div>
        </div>
        <div class="col-12 my-1">
          <div class="form-group">
            <label for="inputDescription">Konfirmasi Password Baru</label>
            <input
              type="password"
              class="form-control"
              id="inputPasswordConfirm"
              v-model="newPasswordConfirm"
              required
            />
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-center mt-4">
            <button
              type="submit"
              class="btn btn-primary text-center px-5 text-light shadow-none"
            >
              <div id="spinnerText">Ubah Password</div>
              <div
                id="loadingSpinner"
                class="spinner-border text-light mx-4 d-none"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </template>
  </Navbar>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import router from "@/router";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

function loadingStart() {
  document.getElementById("spinnerText").classList.add("d-none");
  document.getElementById("loadingSpinner").classList.remove("d-none");
}
function loadingFinish() {
  document.getElementById("spinnerText").classList.remove("d-none");
  document.getElementById("loadingSpinner").classList.add("d-none");
}

export default {
  name: "admin-view",
  components: {
    Navbar,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  methods: {
    changePassword: async function () {
      loadingStart();
      if (this.newPassword == this.newPasswordConfirm) {
        const token = localStorage.getItem("user-token");
        const body = {
          old_password: this.oldPassword,
          new_password: this.newPassword,
        };

        axios
          .post("/change-password", body, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            toast.success(response.data.message, {
              timeout: 2000,
            });
            var delayInMilliseconds = 1000; //1 second

            setTimeout(function () {
              router.push("/admin");
            }, delayInMilliseconds);
            loadingFinish();
          })
          .catch((error) => {
            toast.error(error.response.data.message, {
              timeout: 2000,
            });
            loadingFinish();
          });
      } else {
        toast.error("Password Baru harus sama", {
          timeout: 2000,
        });
        loadingFinish();
      }
    },
  },
};
</script>
