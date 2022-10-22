<script setup>
import Navbar from "@/components/Navbar.vue";
import Modal from "../../components/Modal.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <Navbar page="master">
    <template #content>
      <h5>Kelola Master Data</h5>
      <MasterMenu page="jabatan-category" />
      <hr />
      <RouterLink to="/master/jabatan-category/add" class="btn-add text-light px-4 mt-4">
        <i class="fa-sharp fa-plus"></i>
        <span class="ps-3 font-weight-bold">Tambah Kategori Jabatan</span>
      </RouterLink>
      <div class="table-custom mt-4">
        <table
          class="table table-custom-content w-100"
          v-bind:class="!loading && listJabatanCategory.length ? '' : 'd-none'"
        >
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Nama</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(jabatanCategory, index) in listJabatanCategory" :key="jabatanCategory">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ jabatanCategory.name }}</td>
              <td>
                <div class="d-flex justify-content-around">
                  <RouterLink
                    :to="{
                      name: 'masterJabatanCategoryEdit',
                      params: { id: jabatanCategory.id },
                    }"
                  >
                    <div class="text-primary">
                      <i class="fa-solid fa-user-pen me-2"></i>
                      <span>Edit</span>
                    </div>
                  </RouterLink>
                  <RouterLink to="/master/jabatan-category">
                    <div
                      class="text-danger"
                      data-bs-toggle="modal"
                      :data-bs-target="'#deleteModal' + jabatanCategory.id"
                    >
                      <i class="fa-solid fa-trash me-2"></i>
                      <span>Hapus</span>
                    </div>
                  </RouterLink>
                  <div
                    class="modal fade"
                    :id="'deleteModal' + jabatanCategory.id"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <Modal title="Hapus JabatanCategory">
                      <template #modalContent>
                        <img
                          src="@/assets/icons/InfoDanger.svg"
                          alt="Info Danger"
                        />
                        <p class="mt-4 p-0">
                          Akan menghapus <b>{{ jabatanCategory.name }}</b>
                        </p>
                      </template>
                      <template #buttonConfirm>
                        <div>
                          <button
                            type="button"
                            class="btn btn-danger w-100"
                            data-bs-dismiss="modal"
                            @click="deleteJabatanCategory(jabatanCategory.id)"
                          >
                            Ya, Hapus
                          </button>
                        </div>
                      </template>
                    </Modal>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          id="loadingSpinner"
          v-bind:class="loading ? '' : 'd-none'"
          class="text-center d-flex align-items-center"
          style="height: 400px"
        >
          <div class="w-100">
            <div class="spinner-border text-dark text-center" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div
          v-bind:class="!loading && !listJabatanCategory.length ? '' : 'd-none'"
          id="emptyState"
          class="text-center d-flex align-items-center"
          style="height: 300px"
        >
          <div class="w-100">
            <img
              src="@/assets/icons/Info.svg"
              alt="Info"
              width="200"
              class="mb-2"
            />
            <h5>Belum ada Kategori Jabatan yang ditambahkan</h5>
          </div>
        </div>
      </div>
    </template>
  </Navbar>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  data() {
    return {
      listJabatanCategory: [],
      loading: false,
    };
  },
  methods: {
    getJabatanCategoryList: async function () {
      this.loading = true;
      const token = localStorage.getItem("user-token");
      axios
        .get("/master/jabatan-category", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.listJabatanCategory = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    deleteJabatanCategory: async function (id) {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/master/jabatan-category/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getJabatanCategoryList();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
  },
  mounted() {
    this.getJabatanCategoryList();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
