<script setup>
import Navbar from "../../components/Navbar.vue";
import Modal from "../../components/Modal.vue";
</script>

<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <Modal title="Hapus Info">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4 p-0">
          Akan menghapus Info dengan judul <b>{{ inputTitle }}</b>
        </p>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="deleteNews"
          >
            Hapus
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <Navbar page="info">
    <template #content>
      <h5 class="mb-3">Edit Info</h5>
      <div class="w-100">
        <div class="row">
          <div class="col-12 my-1">
            <div class="form-group">
              <label for="inputTitle">Judul</label>
              <input
                type="text"
                class="form-control"
                id="inputTitle"
                placeholder="Judul"
                v-model="inputTitle"
              />
            </div>
          </div>
          <div class="col-12 my-1">
            <div class="form-group">
              <label for="inputDescription">Deskripsi</label>
              <textarea
                type="textarea"
                rows="5"
                class="form-control"
                id="inputDescription"
                placeholder="Deskripsi"
                v-model="inputDescription"
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button
            @click="putInfo"
            type="submit"
            class="btn btn-primary px-4 text-light text-center mx-2"
          >
            Edit Info
          </button>
          <button
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            class="btn btn-danger px-4 text-light text-center mx-2"
          >
            Hapus Info
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
      inputTitle: "",
      inputDescription: "",
    };
  },
  params: {
    id: String,
  },
  methods: {
    getInfo: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/news/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.inputTitle = response.data.data.title;
          this.inputDescription = response.data.data.description;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    putInfo: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        id: this.id,
        title: this.inputTitle,
        description: this.inputDescription,
      };

      axios
        .put("/news", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/info");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    deleteNews: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/news/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/info");
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
    this.getInfo();
  },
};
</script>

<style scoped>
.btn-add {
  background-color: #6750a4;
  padding-left: 100px;
  padding-right: 100px;
}
.btn-add:hover {
  background-color: #8568d3;
}
</style>
