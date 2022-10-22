<script setup>
import Navbar from "@/components/Navbar.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <Navbar page="master">
    <template #content>
      <h5>Kelola Master Data</h5>
      <MasterMenu page="jabatan" />
      <hr />
      <h6 class="mb-3 text-bold">Tambah Kategori Jabatan</h6>
      <div class="w-100">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for="inputName">Nama</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="Nama Kategori Jabatan"
                v-model="inputName"
              />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button
            type="submit"
            class="btn btn-primary px-5 text-light text-center"
            @click="createJabatanCategory"
          >
            Tambah Kategori Jabatan
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
    };
  },
  methods: {
    createJabatanCategory: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        name: this.inputName,
      };
      console.log(body);

      axios
        .post("/master/jabatan-category", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/master/jabatan-category");
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
<style scoped>
a {
  text-decoration: none;
}
</style>
