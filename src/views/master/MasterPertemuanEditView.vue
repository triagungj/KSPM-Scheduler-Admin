<script setup>
import Navbar from "@/components/Navbar.vue";
import Modal from "../../components/Modal.vue";
import MasterMenu from "@/components/MasterMenu.vue";
</script>
<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <Modal title="Hapus Partisipan">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4 p-0">
          Akan menghapus pertemuan <b>{{ inputName }}</b>
        </p>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="deletePertemuan"
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
      <MasterMenu page="pertemuan" />
      <hr />
      <h6 class="text-bold">Ubah Pertemuan</h6>
      <div class="w-100">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <label for="inputName">Nama</label>
              <input
                type="text"
                class="form-control mb-1"
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
            @click="updatePertemuan"
          >
            Ubah Pertemuan
          </button>
          <button
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            class="btn btn-danger px-4 text-light text-center mx-2"
          >
            Hapus Pertemuan
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
    updatePertemuan: async function () {
      const token = localStorage.getItem("user-token");

      const body = {
        id: this.id,
        name: this.inputName,
      };
      console.log(body);

      axios
        .put("/master/pertemuan", body, {
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
    getDetailPertemuan: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/master/pertemuan/" + this.id, {
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
    deletePertemuan: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/master/pertemuan/" + this.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.replace("/master/pertemuan");
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
    this.getDetailPertemuan();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
