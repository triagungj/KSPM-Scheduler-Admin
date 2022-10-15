<script setup>
import Navbar from "../../components/Navbar.vue";
import Modal from "../../components/Modal.vue";
</script>

<template>
  <div
    class="modal fade"
    :id="'deleteAllPetugasModal'"
    tabindex="-1"
    aria-hidden="true"
  >
    <Modal title="Hapus Semua Petugas">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4">
          Konfirmasi dengan mengetik "<b>HAPUS SEMUA PETUGAS</b>" pada form di
          bawah ini.
        </p>
        <div class="form-outline">
          <input
            type="text"
            class="form-control text-center"
            placeholder="HAPUS SEMUA PETUGAS"
            v-model="confirmationText"
          />
        </div>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="deleteAllPetugas"
            v-bind:disabled="confirmationText != 'HAPUS SEMUA PETUGAS'"
          >
            Hapus Semua
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-4">Kelola Akun Petugas</h5>
      <div class="d-flex justify-content-between">
        <RouterLink to="/member/petugas/add">
          <button class="btn-add text-light px-4">
            <i class="fa-sharp fa-plus"></i>
            <span class="ps-3 font-weight-bold">Tambah Petugas</span>
          </button>
        </RouterLink>
        <button
          data-bs-toggle="modal"
          :data-bs-target="'#deleteAllPetugasModal'"
          class="btn btn-danger text-light px-4"
        >
          <span class="pe-3 font-weight-bold">Hapus Semua</span>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <hr />
      <table
        v-bind:class="!loading && listPetugas.length ? '' : 'd-none'"
        class="table mt-2 content-table"
      >
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Username</th>
            <th scope="col">Nama</th>
            <th scope="col">Superuser</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(petugas, index) in listPetugas"
            :key="petugas"
            class="text-custom-primary"
          >
            <th scope="row">{{ ++index }}</th>
            <td>{{ petugas.username }}</td>
            <td>{{ petugas.name }}</td>
            <td>{{ petugas.is_superuser ? "YES" : "NO" }}</td>
            <td>
              <div class="d-flex justify-content-around">
                <RouterLink
                  :to="{
                    name: 'memberEditPetugas',
                    params: { id: petugas.id },
                  }"
                >
                  <div class="text-primary">
                    <i class="fa-solid fa-user-pen me-2"></i>
                    <span>Edit</span>
                  </div>
                </RouterLink>
                <RouterLink to="/member/petugas">
                  <div
                    class="text-danger"
                    data-bs-toggle="modal"
                    :data-bs-target="'#deleteModal' + petugas.id"
                  >
                    <i class="fa-solid fa-trash me-2"></i>
                    <span>Hapus</span>
                  </div>
                </RouterLink>
                <div
                  class="modal fade"
                  :id="'deleteModal' + petugas.id"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <Modal title="Hapus Petugas">
                    <template #modalContent>
                      <img
                        src="@/assets/icons/InfoDanger.svg"
                        alt="Info Danger"
                      />
                      <p class="mt-4 p-0">
                        Akan menghapus Petugas dengan nama
                        <b>{{ petugas.name }}</b>
                      </p>
                    </template>
                    <template #buttonConfirm>
                      <div>
                        <button
                          type="button"
                          class="btn btn-danger w-100"
                          data-bs-dismiss="modal"
                          @click="deletePetugas(petugas.id)"
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
        v-bind:class="!loading && !listPetugas.length ? '' : 'd-none'"
        id="emptyState"
        class="text-center d-flex align-items-center"
        style="height: 400px"
      >
        <div class="w-100">
          <img
            src="@/assets/icons/Info.svg"
            alt="Info"
            width="200"
            class="mb-2"
          />
          <h5>Belum ada Petugas yang ditambahkan</h5>
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
      loading: false,
      listPetugas: [],
      confirmationText: "",
    };
  },
  methods: {
    getPetugasList: async function () {
      this.loading = true;
      const token = localStorage.getItem("user-token");
      axios
        .get("/account/petugas", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.listPetugas = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    deletePetugas: async function (id) {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/account/petugas/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getPetugasList();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    deleteAllPetugas: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/account/petugas", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getPetugasList();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
  },
  mounted() {
    this.getPetugasList();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}

.content-table th {
  font-weight: bold;
}
.content-table th,
.content-table td {
  border: 1px solid #6750a4;
  text-align: center;
}
.content-table thead {
  background-color: #d9d9d9;
  color: #6750a4;
}
</style>
