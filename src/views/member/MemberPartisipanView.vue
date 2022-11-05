<script setup>
import Navbar from "../../components/Navbar.vue";
import Modal from "../../components/Modal.vue";
</script>
<template>
  <div
    class="modal fade"
    :id="'deletePartisipanModal'"
    tabindex="-1"
    aria-hidden="true"
  >
    <Modal title="Hapus Semua Partisipan">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4">
          Konfirmasi dengan mengetik "<b>HAPUS SEMUA PARTISIPAN</b>" pada form
          di bawah ini.
        </p>
        <div class="form-outline">
          <input
            type="text"
            class="form-control text-center"
            placeholder="HAPUS SEMUA PARTISIPAN"
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
            @click="deleteAllPartisipans"
            v-bind:disabled="confirmationText != 'HAPUS SEMUA PARTISIPAN'"
          >
            Hapus Semua
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <Navbar page="member">
    <template #content>
      <h5>Kelola Akun Partisipan</h5>
      <div class="row">
        <div class="col-8 d-flex">
          <div class="input-group mt-2 me-2" style="width: 200px">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              v-model="inputSearch"
            />
            <button
              @click="getPartisipanList"
              type="button"
              class="btn btn-primary"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>

          <RouterLink to="/member/partisipan/add">
            <button class="btn-add text-light px-4 me-2 mt-2">
              <i class="fa-sharp fa-plus"></i>
              <span class="ps-3 font-weight-bold">Tambah Partisipan</span>
            </button>
          </RouterLink>

          <label
            for="inputFile"
            class="btn-add text-light px-4 mt-2"
            style="cursor: pointer"
          >
            <i class="fa-sharp fa-user-plus"></i>
            <span class="ps-3 font-weight-bold">Tambah Generate</span>
            <input
              id="inputFile"
              type="file"
              class="d-none"
              @change="generatePartisipan"
            />
          </label>
        </div>
        <div class="col-1"></div>
        <button
          class="col-3 btn btn-danger text-light px-4 mt-2"
          data-bs-toggle="modal"
          :data-bs-target="'#deletePartisipanModal'"
        >
          <span class="pe-3 font-weight-bold">Hapus Semua</span>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <hr />
      <div class="table-custom">
        <table
          class="table table-custom-content w-100"
          v-bind:class="!loading && partisipans.length ? '' : 'd-none'"
        >
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Username</th>
              <th scope="col">Nama</th>
              <th scope="col">Jabatan</th>
              <th scope="col">ID Anggota</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(partisipan, index) in partisipans" :key="partisipan">
              <th scope="row">{{ counter + index + 1 }}</th>
              <td>{{ partisipan.username }}</td>
              <td>{{ partisipan.name }}</td>
              <td>{{ partisipan.jabatan ?? "-" }}</td>
              <td>{{ partisipan.member_id }}</td>
              <td>
                <div class="d-flex justify-content-around">
                  <RouterLink
                    :to="{
                      name: 'memberEditPartisipan',
                      params: { id: partisipan.id },
                    }"
                  >
                    <div class="text-primary">
                      <i class="fa-solid fa-user-pen me-2"></i>
                      <span>Edit</span>
                    </div>
                  </RouterLink>
                  <RouterLink to="/member/partisipan">
                    <div
                      class="text-danger"
                      data-bs-toggle="modal"
                      :data-bs-target="'#deleteModal' + partisipan.id"
                    >
                      <i class="fa-solid fa-trash me-2"></i>
                      <span>Hapus</span>
                    </div>
                  </RouterLink>
                  <div
                    class="modal fade"
                    :id="'deleteModal' + partisipan.id"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <Modal title="Hapus Partisipan">
                      <template #modalContent>
                        <img
                          src="@/assets/icons/InfoDanger.svg"
                          alt="Info Danger"
                        />
                        <p class="mt-4 p-0">
                          Akan menghapus partisipan dengan nama
                          <b>{{ partisipan.name }}</b>
                        </p>
                      </template>
                      <template #buttonConfirm>
                        <div>
                          <button
                            type="button"
                            class="btn btn-danger w-100"
                            data-bs-dismiss="modal"
                            @click="deletePartisipan(partisipan.id)"
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
          v-bind:class="!loading && !partisipans.length ? '' : 'd-none'"
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
            <h5>Belum ada partisipan yang ditambahkan</h5>
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
              <button class="page-link" @click="getPartisipanList(index)">
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
      totalPage: null,
      currentPage: 0,
      loading: false,
      partisipans: [],
      counter: 0,
      inputSearch: "",
      confirmationText: "",
    };
  },
  methods: {
    getPartisipanList: async function (page) {
      this.loading = true;
      const token = localStorage.getItem("user-token");
      axios
        .get(
          "/account/partisipans?query=" + this.inputSearch + "&page=" + page,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          this.partisipans = response.data.data.data;
          this.currentPage = response.data.data.current_page;
          this.totalPage = Math.ceil(
            response.data.data.total / response.data.data.per_page
          );
          this.counter =
            (response.data.data.current_page - 1) * response.data.data.per_page;
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    deletePartisipan: async function (id) {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/account/partisipan/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          if (this.partisipans.length <= 1) {
            this.currentPage--;
          }
          this.getPartisipanList(this.currentPage);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    deleteAllPartisipans: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/account/partisipans", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getPartisipanList(1);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    generatePartisipan: async function (event) {
      const token = localStorage.getItem("user-token");
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.loading = true;
      axios
        .post("/account/partisipans", formData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getPartisipanList(1);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getPartisipanList(1);
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
