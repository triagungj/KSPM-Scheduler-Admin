<script setup>
import Navbar from "@/components/Navbar.vue";
import Modal from "../../components/Modal.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <Modal title="Hapus Kategori Jabatan">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4 p-0">
          Akan menghapus jabatan <b>{{ inputName }}</b>
        </p>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="deleteJabatanCategory"
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
      <MasterMenu page="jabatan-category" />
      <hr />
      <h6 class="mb-3 text-bold">Ubah Kategori Jabatan</h6>
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
            @click="updateJabatanCategory"
          >
            Ubah Kategori Jabatan
          </button>
          <button
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            class="btn btn-danger px-4 text-light text-center mx-2"
          >
            Hapus Kategori Jabatan
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
  params: {
    id: String,
  },
  methods: {
    updateJabatanCategory: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        id: this.id,
        name: this.inputName,
      };
      console.log(body);

      axios
        .put("/master/jabatan-category", body, {
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
    getDetailJabatanCategory: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/master/jabatan-category/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.inputName = response.data.data.name;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    deleteJabatanCategory: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/master/jabatan-category/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.replace("/master/jabatan-category3");
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
    this.getDetailJabatanCategory();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
