<script setup>
import Modal from "../components/Modal.vue";
</script>
<template>
  <div
    class="modal fade"
    :id="'deleteModal' + id"
    tabindex="-1"
    aria-hidden="true"
  >
    <Modal title="Hapus Info">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4 p-0">
          Akan menghapus Info dengan judul <b>{{ title }}</b>
        </p>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="onDelete(id)"
          >
            Hapus
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <div class="info-card d-flex my-2">
    <RouterLink :to="{ name: 'infoEdit', params: { id: id } }" :id="id">
      <div class="bg-custom-primary p-3 rounded me-3 d-flex align-items-center">
        <img src="@/assets/icons/InfoCardIcon.svg" />
      </div>
    </RouterLink>
    <div class="w-100 d-inline">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <RouterLink :to="{ name: 'infoEdit', params: { id: id } }" :id="id">
            <h6 class="my-0 text-dark">
              {{ title }}
            </h6>
          </RouterLink>
          <span class="ms-3 text-info" style="font-size: 10pt"
            ><RouterLink
              :to="{ name: 'infoEdit', params: { id: id } }"
              :id="id"
            >
              Edit
            </RouterLink>
            |
            <a
              href=""
              class="shadow-none"
              data-bs-toggle="modal"
              :data-bs-target="'#deleteModal' + id"
            >
              <span class="align-middle text-primary">Hapus</span>
            </a>
          </span>
        </div>

        <span class="text-info">{{ format_date(date) }}</span>
      </div>
      <RouterLink :to="{ name: 'infoEdit', params: { id: id } }">
        <p class="m-0 pt-1 info-detail text-dark">
          {{ description }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "InfoCard",
  props: {
    id: String,
    title: String,
    description: String,
    date: String,
    editUrl: String,
    onDelete: Function,
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("lll");
      }
    },
  },
};
</script>

<style scoped>
.icon-info-danger {
  background-image: url("@/assets/icons/InfoDanger.svg");
}
.info-card {
  border-radius: 12px;
  padding: 10px;
  width: 100%;
  background-color: #f4eff4;
  max-height: 150px;
}
.info-detail {
  font-size: 10pt;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  line-height: 1.2em;
  -webkit-box-orient: vertical;
}
a {
  text-decoration: none;
}
</style>
