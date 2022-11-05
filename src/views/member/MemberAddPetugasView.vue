<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-3">Buat Akun Petugas</h5>
      <div class="w-100">
        <div class="row">
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputUsername">Username</label>
              <input
                type="text"
                class="form-control"
                id="inputUsername"
                placeholder="Username"
                v-model="inputUsername"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Password"
                v-model="inputPassword"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputNamaLengkap">Nama Lengkap</label>
              <input
                type="text"
                class="form-control"
                id="inputNamaLengkap"
                placeholder="Nama Lengkap"
                v-model="inputName"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputNomorWhatsapp">Nomor Whatsapp</label>
              <input
                type="text"
                class="form-control"
                id="inputNomorWhatsapp"
                placeholder="628236534xxx"
                v-model="inputPhoneNumber"
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button
            type="submit"
            class="btn-add text-light text-center px-5"
            @click="createPetugas"
          >
            Buat Akun
          </button>
        </div>
      </div>
    </template>
  </Navbar>
</template>
<script>
import router from "@/router";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  data() {
    return {
      inputUsername: "",
      inputName: "",
      inputPassword: "",
      inputPhoneNumber: "",
    };
  },
  methods: {
    createPetugas: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        username: this.inputUsername,
        name: this.inputName,
        password: this.inputPassword,
        phone_number: this.inputPhoneNumber,
      };

      axios
        .post("/account/petugas", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/member/petugas");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
  },
};
</script>
