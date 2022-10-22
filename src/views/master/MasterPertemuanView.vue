<script setup>
import Navbar from "@/components/Navbar.vue";
import Modal from "../../components/Modal.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <Navbar page="master">
    <template #content>
      <h5>Kelola Master Data</h5>
      <MasterMenu page="pertemuan" />
      <hr />
      <RouterLink
        to="/master/pertemuan/add"
        class="btn-add text-light px-4 mt-4"
      >
        <i class="fa-sharp fa-plus"></i>
        <span class="ps-3 font-weight-bold">Tambah Pertemuan</span>
      </RouterLink>
      <div class="table-custom mt-4">
        <table
          class="table table-custom-content w-100"
          v-bind:class="!loading && listPertemuan.length ? '' : 'd-none'"
        >
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Nama</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pertemuan, index) in listPertemuan" :key="pertemuan">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ pertemuan.name }}</td>
              <td>
                <div class="d-flex justify-content-around">
                  <RouterLink
                    :to="{
                      name: 'masterPertemuanEdit',
                      params: { id: pertemuan.id },
                    }"
                  >
                    <div class="text-primary">
                      <i class="fa-solid fa-user-pen me-2"></i>
                      <span>Edit</span>
                    </div>
                  </RouterLink>
                  <RouterLink to="/master/pertemuan">
                    <div
                      class="text-danger"
                      data-bs-toggle="modal"
                      :data-bs-target="'#deleteModal' + pertemuan.id"
                    >
                      <i class="fa-solid fa-trash me-2"></i>
                      <span>Hapus</span>
                    </div>
                  </RouterLink>
                  <div
                    class="modal fade"
                    :id="'deleteModal' + pertemuan.id"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <Modal title="Hapus Pertemuan">
                      <template #modalContent>
                        <img
                          src="@/assets/icons/InfoDanger.svg"
                          alt="Info Danger"
                        />
                        <p class="mt-4 p-0">
                          Akan menghapus <b>{{ pertemuan.name }}</b>
                        </p>
                      </template>
                      <template #buttonConfirm>
                        <div>
                          <button
                            type="button"
                            class="btn btn-danger w-100"
                            data-bs-dismiss="modal"
                            @click="deletePertemuan(pertemuan.id)"
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
          v-bind:class="!loading && !listPertemuan.length ? '' : 'd-none'"
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
            <h5>Belum ada pertemuan yang ditambahkan</h5>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <nav class="text-center">
          <ul v-if="totalPage > 1" class="pagination">
            <li
              v-for="index in totalPage"
              :key="index"
              class="page-item"
              v-bind:class="index == currentPage ? 'active' : ''"
            >
              <button class="page-link" @click="getPertemuanList(index)">
                {{ index }}
              </button>
            </li>
          </ul>
        </nav>
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
      listPertemuan: [],
      loading: false,
    };
  },
  methods: {
    getPertemuanList: async function () {
      this.loading = true;
      const token = localStorage.getItem("user-token");
      axios
        .get("/master/pertemuan", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.listPertemuan = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    deletePertemuan: async function (id) {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/master/pertemuan/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getPertemuanList();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
  },
  mounted() {
    this.getPertemuanList();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
