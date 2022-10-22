<script setup>
import Navbar from "@/components/Navbar.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <Navbar page="master">
    <template #content>
      <h5>Kelola Master Data</h5>
      <MasterMenu page="pertemuan" />
      <hr />
      <h6 class="text-bold">Tambah Pertemuan</h6>
      <div class="w-100">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for="inputName">Nama</label>
              <input
                type="text"
                class="form-control mt-1"
                id="inputName"
                placeholder="Nama Pertemuan"
                v-model="inputName"
              />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button
            type="submit"
            class="btn btn-primary px-5 text-light text-center"
            @click="createSesi"
          >
            Tambah Pertemuan
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
    createSesi: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        name: this.inputName,
      };
      console.log(body);

      axios
        .post("/master/pertemuan", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/master/pertemuan");
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
