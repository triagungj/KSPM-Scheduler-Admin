<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-3">Buat Akun Partisipan</h5>
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
            <label for="selectJabatan">Jabatan</label>
            <select
              id="selectJabatan"
              class="form-select"
              v-model="inputJabatan"
            >
              <option value="" hidden selected>-</option>
              <option
                v-for="jabatan in jabatans"
                v-bind:value="jabatan.id"
                v-bind:key="jabatan.id"
                v-bind:selected="inputJabatan == jabatan.id"
              >
                {{ jabatan.name }}
              </option>
            </select>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputIdAnggota">ID Anggota</label>
              <input
                type="text"
                class="form-control"
                id="inputIdAnggota"
                placeholder="ID Anggota"
                v-model="inputMemberId"
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
            class="btn btn-primary px-5 text-light text-center"
            @click="createPartisipan"
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
      inputMemberId: "",
      inputJabatan: "",
      jabatans: [],
    };
  },
  methods: {
    createPartisipan: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        username: this.inputUsername,
        name: this.inputName,
        password: this.inputPassword,
        phone_number: this.inputPhoneNumber,
        member_id: this.inputMemberId,
        jabatan_id: this.inputJabatan,
      };
      console.log(body);

      axios
        .post("/account/partisipan", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/member/partisipan");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    getListJabatan: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/master/jabatan", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.jabatans = response.data.data;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
  },
  mounted() {
    this.getListJabatan();
  },
};
</script>
