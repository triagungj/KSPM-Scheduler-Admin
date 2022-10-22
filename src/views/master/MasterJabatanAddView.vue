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
      <h6 class="mb-3 text-bold">Tambah Jabatan</h6>
      <div class="w-100">
        <div class="row">
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputName">Nama</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="Nama Jabatan"
                v-model="inputName"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <label for="selectJabatanCategory">JabatanCategory</label>
            <select
              id="selectJabatanCategory"
              class="form-select"
              v-model="inputJabatanCategoryId"
            >
              <option value="" hidden selected>-</option>
              <option
                v-for="jabatanCategory in jabatanCategories"
                v-bind:value="jabatanCategory.id"
                v-bind:key="jabatanCategory.id"
                v-bind:selected="inputJabatanCategoryId == jabatanCategory.id"
              >
                {{ jabatanCategory.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button
            type="submit"
            class="btn btn-primary px-5 text-light text-center"
            @click="createJabatan"
          >
            Tambah Jabatan
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
      inputJabatanCategoryId: "",
      jabatanCategories: [],
    };
  },
  methods: {
    createJabatan: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        name: this.inputName,
        jabatan_category_id: this.inputJabatanCategoryId,
      };
      console.log(body);

      axios
        .post("/master/jabatan", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/master/jabatan");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    getListJabatanCategory: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/master/jabatan-category", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.jabatanCategories = response.data.data;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
  },
  mounted() {
    this.getListJabatanCategory();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
