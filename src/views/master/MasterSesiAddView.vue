<script setup>
import Navbar from "@/components/Navbar.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <Navbar page="master">
    <template #content>
      <h5>Kelola Master Data</h5>
      <MasterMenu page="sesi" />
      <hr />
      <h6 class="mb-3 text-bold">Tambah Sesi</h6>
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
            @click="createSesi"
          >
            Tambah Sesi
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
  methods: {
    createSesi: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        name: this.inputName,
        pertemuan_id: this.inputPertemuanId,
        hari: this.inputHari,
        waktu: this.inputWaktu,
      };
      console.log(body);

      axios
        .post("/master/sesi", body, {
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
  },
  mounted() {
    this.getListPertemuan();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
