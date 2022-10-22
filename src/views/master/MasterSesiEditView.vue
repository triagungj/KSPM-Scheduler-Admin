<script setup>
import Navbar from "@/components/Navbar.vue";
import Modal from "../../components/Modal.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <Modal title="Hapus Sesi">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4 p-0">
          Akan menghapus sesi <b>{{ inputName }}</b> di hari
          <b>{{ inputHari }}</b>
        </p>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="deleteSesi"
          >
            Hapus
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <Navbar page="master">
    <template #content>
      <h5>Kelola Master Data</h5>
      <MasterMenu page="sesi" />
      <hr />
      <h6 class="mb-3 text-bold">Ubah Sesi</h6>
      <div class="w-100">
        <div class="row">
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputName">Nama</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="Nama Sesi"
                v-model="inputName"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <label for="selectHari">Hari</label>
            <select id="selectHari" class="form-select" v-model="inputHari">
              <option value="" hidden selected>-</option>
              <option value="senin">Senin</option>
              <option value="selasa">Selasa</option>
              <option value="rabu">Rabu</option>
              <option value="kamis">Kamis</option>
              <option value="jumat">Jumat</option>
            </select>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputWaktu">Waktu</label>
              <input
                type="text"
                class="form-control"
                id="inputWaktu"
                placeholder="09:00 - 10:30"
                v-model="inputWaktu"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <label for="selectPertemuan">Pertemuan</label>
            <select
              id="selectPertemuan"
              class="form-select"
              v-model="inputPertemuanId"
            >
              <option value="" hidden selected>-</option>
              <option
                v-for="pertemuan in pertemuans"
                v-bind:value="pertemuan.id"
                v-bind:key="pertemuan.id"
                v-bind:selected="inputPertemuanId == pertemuan.id"
              >
                {{ pertemuan.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button
            type="submit"
            class="btn btn-primary px-5 text-light text-center"
            @click="updateSesi"
          >
            Ubah Sesi
          </button>
          <button
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            class="btn btn-danger px-4 text-light text-center mx-2"
          >
            Hapus Sesi
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
      inputName: "",
      inputHari: "",
      inputWaktu: "",
      inputPertemuanId: "",
      pertemuans: [],
    };
  },
  params: {
    id: String,
  },
  methods: {
    updateSesi: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        id: this.id,
        name: this.inputName,
        pertemuan_id: this.inputPertemuanId,
        hari: this.inputHari,
        waktu: this.inputWaktu,
      };
      console.log(body);

      axios
        .put("/master/sesi", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/master/sesi");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    getDetailSesi: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/master/sesi/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.inputName = response.data.data.name;
          this.inputHari = response.data.data.hari;
          this.inputWaktu = response.data.data.waktu;
          this.inputPertemuanId = response.data.data.pertemuan_id;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    getListPertemuan: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/master/pertemuan", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.pertemuans = response.data.data;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    deleteSesi: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/master/sesi/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.replace("/master/sesi");
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
    this.getDetailSesi();
    this.getListPertemuan();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
