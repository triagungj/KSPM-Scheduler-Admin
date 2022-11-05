<script setup>
import Navbar from "../../components/Navbar.vue";
import Modal from "../../components/Modal.vue";
</script>
<template>
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
  <div
    class="modal fade"
    :id="'submitScheduleModal'"
    tabindex="-1"
    aria-hidden="true"
  >
    <Modal title="Simpan dan Terbitkan Jadwal">
      <template #modalContent>
        <img
          src="@/assets/ilustrasions/ScheduleIlu.svg"
          alt="Schedule Ilus"
          width="200"
        />
        <h6 class="mt-4">
          Jadwal yang sudah digenerate akan diterbitkan untuk Partisipan
        </h6>
      </template>
      <template #buttonConfirm>
        <div>
          <button
            type="button"
            class="btn-add text-light w-100"
            data-bs-dismiss="modal"
            @click="submitSchedule"
          >
            Terbitkan
          </button>
        </div>
      </template>
    </Modal>
  </div>
  <Navbar page="schedule">
    <template #content>
      <h5>Mengatur Ulang Jadwal</h5>
      <div class="d-flex justify-content-between align-self-end">
        <div class="d-flex">
          <div class="text-center me-3">
            <button
              class="btn-add mt-2 text-light text-small text-bold px-4"
              data-bs-toggle="modal"
              :data-bs-target="'#rescheduleModal'"
            >
              <i class="fa fa-sync-alt me-3"></i>
              <span>Generate Jadwal</span>
            </button>
          </div>
        </div>
        <div class="d-flex">
          <button
            class="btn btn-outline-primary mt-auto px-4 py-1"
            data-bs-toggle="modal"
            :data-bs-target="'#submitScheduleModal'"
          >
            <i class="fa fa-check me-2 text-small"></i>
            <span class="text-small">Simpan & terbitkan</span>
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
          <button
            data-bs-toggle="modal"
            :data-bs-target="'#rescheduleModal'"
            class="btn btn-outline-primary mt-2 px-4"
          >
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
                {{
                  sesiIndex.anggota[anggotaIndex - 1] != null
                    ? sesiIndex.anggota[anggotaIndex - 1].partisipan_name
                    : ""
                }}
              </td>
            </tr>
            <tr
              v-bind:class="isPengurus ? '' : 'd-none'"
              v-for="pengurusIndex in getMaxLengthPengurus(schedule.list_sesi)"
              :key="pengurusIndex"
            >
              <td v-for="sesiIndex in schedule.list_sesi" :key="sesiIndex">
                {{
                  sesiIndex.pengurus[pengurusIndex - 1] != null
                    ? sesiIndex.pengurus[pengurusIndex - 1].partisipan_name
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
import router from "@/router";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

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
          this.schedules = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
    },
    submitSchedule: async function () {
      this.loading = true;
      const token = localStorage.getItem("user-token");
      const scheduleCandidatesId = [];
      this.schedules.forEach((schedule) => {
        schedule.list_sesi.forEach((sesi) => {
          sesi.pengurus.forEach((pengurus) => {
            scheduleCandidatesId.push(pengurus.schedule_candidate_id);
          });
          sesi.anggota.forEach((anggota) => {
            scheduleCandidatesId.push(anggota.schedule_candidate_id);
          });
        });
      });
      const body = { schedule_candidates: scheduleCandidatesId };
      axios
        .post("/schedule/submit", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          router.push("/schedule");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          this.loading = false;
        });
      this.loading = false;
    },
  },
  mounted() {
    this.getAllSchedule();
  },
};
</script>
