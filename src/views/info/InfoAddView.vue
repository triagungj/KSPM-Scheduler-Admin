<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="info">
    <template #content>
      <h5 class="mb-3">Tambah Info</h5>
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
                v-model="title"
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
                v-model="description"
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button @click="postInfo" class="btn btn-add text-light text-center">
            Tambah Info
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
      title: "",
      description: "",
    };
  },

  methods: {
    postInfo: async function () {
      const token = localStorage.getItem("user-token");

      const body = { title: this.title, description: this.description };
      axios
        .post("/news", body, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
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
      console.log(body);
    },
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
