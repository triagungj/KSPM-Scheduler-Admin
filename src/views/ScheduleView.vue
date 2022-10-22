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
          mengetik <br />"<b>HAPUS SEMUA JADWAL PARTISIPAN</b>" <br />pada form
          di bawah ini.
        </p>
        <div class="form-outline">
          <input
            type="text"
            class="form-control text-center"
            placeholder="HAPUS SEMUA JADWAL PARTISIPAN"
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
              confirmationText != 'HAPUS SEMUA JADWAL PARTISIPAN'
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
    :id="'rescheduleModal'"
    tabindex="-1"
    aria-hidden="true"
  >
    <Modal title="Atur Ulang Jadwal">
      <template #modalContent>
        <img
          src="@/assets/ilustrasions/RescheduleIlu.svg"
          alt="Reschedule Ilus"
          width="200"
        />
        <h6 class="mt-4">Akan mengatur ulang jadwal Partisipan</h6>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn-add text-light w-100"
            data-bs-dismiss="modal"
            @click="generateSchedule"
          >
            Atur ulang Jadwal
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <header>
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
              <button
                class="btn-add mt-2 text-light text-small text-bold px-4"
                data-bs-toggle="modal"
                :data-bs-target="'#rescheduleModal'"
              >
                <i class="fa fa-history me-3"></i>
                <span>Atur Ulang Jadwal</span>
              </button>
            </div>
            <button
              v-if="!loading && schedules.length"
              class="btn btn-outline-primary mt-auto px-4 py-1"
            >
              <i class="fa fa-download me-2 text-small"></i>
              <span class="text-small">Unduh Jadwal</span>
            </button>
          </div>
          <div class="d-flex">
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
            <button class="btn btn-outline-primary mt-2 px-4">
              <i class="fa fa-history me-3"></i>
              <span>Mulai Atur Jadwal</span>
            </button>
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
          <table class="w-100 mt-3 schedule-table">
            <tbody v-for="schedule in schedules" :key="schedule">
              <tr>
                <th
                  :rowspan="
                    isPengurus
                      ? getMaxLengthPengurus(schedule.list_sesi) + 1
                      : getMaxLengthAnggota(schedule.list_sesi) + 1
                  "
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
                v-bind:class="!isPengurus ? '' : 'd-none'"
                v-for="anggotaIndex in getMaxLengthAnggota(schedule.list_sesi)"
                :key="anggotaIndex"
              >
                <td v-for="sesiIndex in schedule.list_sesi" :key="sesiIndex">
                  {{ sesiIndex.anggota[anggotaIndex - 1] ?? "" }}
                </td>
              </tr>
              <tr
                v-bind:class="isPengurus ? '' : 'd-none'"
                v-for="pengurusIndex in getMaxLengthPengurus(
                  schedule.list_sesi
                )"
                :key="pengurusIndex"
              >
                <td v-for="sesiIndex in schedule.list_sesi" :key="sesiIndex">
                  {{ sesiIndex.pengurus[pengurusIndex - 1] ?? "" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Navbar>
  </header>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";

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
  },
  mounted() {
    this.getAllSchedule();
  },
};
</script>
<style>
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
