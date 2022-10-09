<script setup>
import Navbar from "../../components/Navbar.vue";
import Modal from "../../components/Modal.vue";
</script>

<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <Modal title="Hapus Info">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4 p-0">
          Akan menghapus Info dengan nama <b>{{ inputName }}</b>
        </p>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="deleteNews"
          >
            Hapus
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-3">Edit Akun Partisipan</h5>
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
            @click="putPartisipan"
            type="submit"
            class="btn btn-primary px-5 text-light text-center"
          >
            Edit Akun
          </button>
          <button
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            class="btn btn-danger px-4 text-light text-center mx-2"
          >
            Hapus Partisipan
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
  params: {
    id: String,
  },
  methods: {
    putPartisipan: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        username: this.inputUsername,
        name: this.inputName,
        password: this.inputPassword,
        jabatan_id: this.inputJabatan,
        member_id: this.inputMemberId,
        phone_number: this.inputPhoneNumber,
      };

      axios
        .put("/account/partisipan/" + this.id, body, {
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
    getPartisipan: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/account/partisipan/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.inputUsername = response.data.data.username;
          this.inputName = response.data.data.name;
          this.inputMemberId = response.data.data.member_id;
          this.inputPhoneNumber = response.data.data.phone_number;
          this.inputJabatan = response.data.data.jabatan_id;
          console.log(response.data.data);
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
        .get("/jabatans", {
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
    this.id = this.$route.params.id;
    this.getListJabatan();
    this.getPartisipan();
  },
};
</script>

<style scoped>
.btn-register {
  background-color: #6750a4;
  padding-left: 100px;
  padding-right: 100px;
}
.btn-register:hover {
  background-color: #8568d3;
}
</style>
