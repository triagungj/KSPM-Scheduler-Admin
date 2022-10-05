<script setup>
import Navbar from "../components/Navbar.vue";
import InfoCard from "../components/InfoCard.vue";
</script>

<template>
  <Navbar page="info">
    <template #content>
      <h5 class="mb-4">Kelola Info</h5>
      <RouterLink to="/info/add" class="btn-add text-light px-4 me-2">
        <i class="fa-sharp fa-plus"></i>
        <span class="ps-3 font-weight-bold">Tambah Info</span>
      </RouterLink>
      <hr />
      <div class="content-info">
        <div id="listInfo">
          <InfoCard
            v-for="info in infos"
            :key="info.id"
            :id="info.id"
            :title="info.title"
            :description="info.description"
            :date="info.updated_at"
            v-bind:onDelete="deleteNews"
            editUrl="/info/edit"
          />
        </div>
        <div
          id="loadingSpinner"
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
          v-if="!infos.length"
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
            <h5>Belum ada info yang ditambahkan</h5>
          </div>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-center">
        <nav class="text-center">
          <ul v-if="totalPage > 1" class="pagination">
            <li
              v-for="index in totalPage"
              :key="index"
              class="page-item"
              v-bind:class="index == currentPage ? 'active' : ''"
            >
              <button class="page-link" @click="getNewsList(index)">
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

function loadingStart() {
  document.getElementById("loadingSpinner").classList.remove("d-none");
  document.getElementById("listInfo").classList.add("d-none");
}
function loadingFinish() {
  document.getElementById("loadingSpinner").classList.add("d-none");
  document.getElementById("listInfo").classList.remove("d-none");
}

export default {
  data() {
    return {
      totalPage: null,
      currentPage: 0,
      infos: [],
    };
  },
  methods: {
    getNewsList: async function (page) {
      loadingStart();
      const token = localStorage.getItem("user-token");
      axios
        .get("/news?page=" + page, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.infos = response.data.data.data;
          this.currentPage = response.data.data.current_page;
          this.totalPage = Math.ceil(
            response.data.data.total / response.data.data.per_page
          );
          loadingFinish();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          loadingFinish();
        });
    },
    deleteNews: async function (id) {
      const token = localStorage.getItem("user-token");
      axios
        .delete("/news/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          if (this.infos.length <= 1) {
            this.currentPage--;
            console.log(this.currentPage);
          }
          this.getNewsList(this.currentPage);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
  },
  mounted() {
    this.getNewsList(1);
  },
};
</script>
<style scoped>
.content-info {
  min-height: 300px;
}
a {
  text-decoration: none;
}
.btn-add {
  border-radius: 8px;
  padding: 12px 20px;
  background-color: #6750a4;
  transition: 0.5s;
}
.btn-add:hover {
  background-color: #604be6;
}
/* a {
  text-decoration: none;
}
a:hover {
  background-color: none;
} */
</style>
