<script setup>
import Navbar from "../components/Navbar.vue";
import Modal from "../components/Modal.vue";
</script>

<template>
  <div
    class="modal fade"
    :id="'deleteAllScheduleModal'"
    tabindex="-1"
    aria-hidden="true"
  >
    <Modal title="Atur Ulang Periode">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4">
          Jadwal yang diinput oleh Partisipan akan dihapus. Konfirmasi dengan
          mengetik <br />"<b>HAPUS SEMUA JADWAL SEDIA PARTISIPAN</b>" <br />pada
          form di bawah ini.
        </p>
        <div class="form-outline">
          <input
            type="text"
            class="form-control text-center"
            placeholder="HAPUS SEMUA JADWAL SEDIA PARTISIPAN"
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
            @click="resetSchedule"
            v-bind:disabled="
              confirmationText != 'HAPUS SEMUA JADWAL SEDIA PARTISIPAN'
            "
          >
            Perbarui Periode
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <div
    class="modal fade"
    :id="'deleteCurrentScheduleModal'"
    tabindex="-1"
    aria-hidden="true"
  >
    <Modal title="Hapus Jadwal Saat Ini">
      <template #modalContent>
        <img src="@/assets/icons/InfoDanger.svg" alt="Info Danger" />
        <p class="mt-4">
          Jadwal yang telah diterbitkan dibawah akan dihapus. Konfirmasi dengan
          mengetik <br />"<b>HAPUS JADWAL YANG DITERBITKAN</b>" <br />pada form
          di bawah ini.
        </p>
        <div class="form-outline">
          <input
            type="text"
            class="form-control text-center"
            placeholder="HAPUS JADWAL YANG DITERBITKAN"
            v-model="confirmationDeleteScheduleText"
          />
        </div>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn btn-danger w-100"
            data-bs-dismiss="modal"
            @click="deleteCurrentSchedule"
            v-bind:disabled="
              confirmationDeleteScheduleText != 'HAPUS JADWAL YANG DITERBITKAN'
            "
          >
            Hapus Jadwal
          </button>
        </div>
      </template>
    </Modal>
  </div>

  <Navbar page="schedule">
    <template #content>
      <h5 class="text-center"><b>Jadwal Edukasi Harian</b></h5>
      <div class="d-flex justify-content-between align-self-end">
        <div class="d-flex">
          <div class="text-center me-3">
            <div v-bind:class="lastUpdate == null ? 'invisible' : ''">
              <h6 class="text-small m-0">Terakhir diperbarui</h6>
              <p class="text-small-600 m-0">{{ formatDate(lastUpdate) }}</p>
            </div>
            <RouterLink to="schedule/generate">
              <button class="btn-add mt-2 text-light text-small text-bold px-4">
                <span>Atur Ulang Jadwal</span>
              </button>
            </RouterLink>
          </div>
          <button
            v-if="!loading && schedules.length"
            class="btn btn-outline-primary mt-auto px-4 py-1"
            @click="exportTable"
          >
            <i class="fa fa-download me-2 text-small"></i>
            <span class="text-small">Unduh Jadwal</span>
          </button>
        </div>
        <div class="d-flex">
          <button
            v-if="!loading && schedules.length"
            class="btn-error mt-auto text-light text-small text-bold px-4 me-2"
            data-bs-toggle="modal"
            :data-bs-target="'#deleteCurrentScheduleModal'"
          >
            <i class="fa fa-trash me-3"></i>
            <span>Hapus Jadwal</span>
          </button>
          <button
            class="btn-error mt-auto text-light text-small text-bold px-4"
            data-bs-toggle="modal"
            :data-bs-target="'#deleteAllScheduleModal'"
          >
            <i class="fa fa-undo me-3"></i>
            <span>Perbarui Periode Jadwal</span>
          </button>
        </div>
      </div>
      <hr />
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
        v-if="!loading && !schedules.length"
        id="emptyState"
        class="text-center d-flex align-items-center"
        style="height: 400px"
      >
        <div class="w-100">
          <img
            src="@/assets/ilustrasions/CalendarIlu.svg"
            alt="Info"
            width="250"
            class="mb-2"
          />
          <h5>Belum ada Jadwal yang diatur</h5>
        </div>
      </div>
      <div class="schedule-view" v-if="!loading && schedules.length">
        <button
          v-bind:class="isPengurus ? 'label-active' : ''"
          class="btn-label me-1"
          @click="isPengurus = true"
        >
          Jadwal Pengurus
        </button>
        <button
          v-bind:class="!isPengurus ? 'label-active' : ''"
          class="btn-label"
          @click="isPengurus = false"
        >
          Jadwal Anggota
        </button>
        <table
          id="tablePengurus"
          v-bind:class="isPengurus ? '' : 'd-none'"
          class="w-100 mt-3 schedule-table"
          ref="table_pengurus"
        >
          <tbody v-for="schedule in schedules" :key="schedule">
            <tr>
              <th
                :rowspan="getMaxLengthPengurus(schedule.list_sesi) + 1"
                width="15%"
                class="text-capitalize"
              >
                {{ schedule.hari }}
              </th>
              <th v-for="sesi in schedule.list_sesi" :key="sesi">
                {{ sesi.name }} ({{ sesi.waktu }})
              </th>
            </tr>
            <tr
              v-for="pengurusIndex in getMaxLengthPengurus(schedule.list_sesi)"
              :key="pengurusIndex"
            >
              <td v-for="sesiIndex in schedule.list_sesi" :key="sesiIndex">
                {{
                  sesiIndex.pengurus[pengurusIndex - 1] != null
                    ? sesiIndex.pengurus[pengurusIndex - 1].partisipan_name +
                      " (" +
                      sesiIndex.pengurus[pengurusIndex - 1].jabatan_category +
                      ")"
                    : ""
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <table
          id="tableAnggota"
          v-bind:class="!isPengurus ? '' : 'd-none'"
          class="w-100 mt-3 schedule-table"
          ref="table_anggota"
        >
          <tbody v-for="schedule in schedules" :key="schedule">
            <tr>
              <th
                :rowspan="getMaxLengthAnggota(schedule.list_sesi) + 1"
                width="15%"
                class="text-capitalize"
              >
                {{ schedule.hari }}
              </th>
              <th v-for="sesi in schedule.list_sesi" :key="sesi">
                {{ sesi.name }} ({{ sesi.waktu }})
              </th>
            </tr>
            <tr
              v-for="anggotaIndex in getMaxLengthAnggota(schedule.list_sesi)"
              :key="anggotaIndex"
            >
              <td v-for="sesiIndex in schedule.list_sesi" :key="sesiIndex">
                {{
                  sesiIndex.anggota[anggotaIndex - 1] != null
                    ? sesiIndex.anggota[anggotaIndex - 1].partisipan_name +
                      " (" +
                      sesiIndex.anggota[anggotaIndex - 1].jabatan_category +
                      ")"
                    : ""
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </Navbar>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import XLSX from "xlsx";
const toast = useToast();

function formatDate(date) {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  var today = new Date(date);
  return today.toLocaleDateString("id-ID", options);
}

function getMaxLengthPengurus(listSesi) {
  var arrayMax = [];

  for (var i = 0; i < listSesi.length; i++) {
    arrayMax.push(listSesi[i].pengurus.length);
  }

  return Math.max(...arrayMax);
}
function getMaxLengthAnggota(listSesi) {
  var arrayMax = [];

  for (var i = 0; i < listSesi.length; i++) {
    arrayMax.push(listSesi[i].anggota.length);
  }

  return Math.max(...arrayMax);
}

export default {
  data() {
    return {
      schedules: [],
      lastUpdate: null,
      isPengurus: true,
      loading: false,
      confirmationText: "",
      confirmationDeleteScheduleText: "",
    };
  },
  methods: {
    getAllSchedule: async function () {
      this.loading = true;
      const token = localStorage.getItem("user-token");
      axios
        .get("/schedule", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.schedules = response.data.data;
          this.lastUpdate = response.data.last_update;
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    generateSchedule: async function () {
      this.loading = true;
      this.schedule = [];
      this.lastUpdate = null;
      const token = localStorage.getItem("user-token");
      axios
        .get("/schedule/generate", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getAllSchedule();
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    deleteCurrentSchedule: async function () {
      this.loading = true;
      this.schedule = [];
      this.lastUpdate = null;
      const token = localStorage.getItem("user-token");
      axios
        .delete("/schedule/delete", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getAllSchedule();
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    resetSchedule: async function () {
      this.loading = true;
      this.schedule = [];
      this.lastUpdate = null;
      const token = localStorage.getItem("user-token");
      axios
        .get("/schedule/reset", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.getAllSchedule();
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    exportTable: async function () {
      var workbook = XLSX.utils.book_new();

      var ws1 = XLSX.utils.table_to_sheet(
        document.getElementById("tablePengurus")
      );
      var ws2 = XLSX.utils.table_to_sheet(
        document.getElementById("tableAnggota")
      );

      XLSX.utils.book_append_sheet(workbook, ws1, "Pengurus");
      XLSX.utils.book_append_sheet(workbook, ws2, "Anggota");

      XLSX.writeFile(workbook, "Jadwal-" + this.lastUpdate + ".xlsx", {
        cellStyles: true,
      });
    },
  },
  mounted() {
    this.getAllSchedule();
  },
};
</script>
<style>
a {
  text-decoration: none;
}
.schedule-table td,
.schedule-table th {
  border: 1px solid #6750a4;
  padding-left: 8px;
  padding-right: 8px;
}
.schedule-table th {
  background-color: #f9dedc;
  font-size: 11pt;
  color: #6750a4;
  font-weight: 600;
  text-align: center;
}
.schedule-table td {
  font-size: 10pt;
  /* color: #6750a4; */
}
</style>
