<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <header>
    <Navbar page="schedule">
      <template #content>
        <h5 class="text-center">Jadwal Edukasi Harian</h5>
        <div class="d-flex justify-content-between align-self-end">
          <div class="d-flex">
            <div class="text-center me-3">
              <h6 class="text-small m-0">Terakhir diperbarui</h6>
              <p class="text-small-600 m-0">28 September 2022, 10:40</p>
              <button class="btn-add mt-2 text-light text-small text-bold px-4">
                <i class="fa fa-history me-3"></i>
                <span>Atur Ulang Jadwal</span>
              </button>
            </div>
            <button class="btn btn-outline-primary mt-auto px-4 py-1">
              <i class="fa fa-download me-2 text-small"></i>
              <span class="text-small">Unduh Jadwal</span>
            </button>
          </div>
          <div class="d-flex">
            <button
              class="btn-error mt-auto text-light text-small text-bold px-4"
            >
              <i class="fa fa-undo me-3"></i>
              <span>Perbarui Periode Jadwal</span>
            </button>
          </div>
        </div>
        <hr />
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
              <th :rowspan="getMaxLength(schedule.list_sesi) + 1" width="15%">
                {{ schedule.hari }}
              </th>
              <th v-for="sesi in schedule.list_sesi" :key="sesi">
                {{ sesi.name }} ({{ sesi.waktu }})
              </th>
            </tr>
            <tr
              v-for="pengurusIndex in getMaxLength(schedule.list_sesi)"
              :key="pengurusIndex"
            >
              <td v-for="sesiIndex in schedule.list_sesi" :key="sesiIndex">
                {{ sesiIndex.pengurus[pengurusIndex - 1] ?? "" }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Navbar>
  </header>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

function getMaxLength(listSesi) {
  var arrayMax = [];

  for (var i = 0; i < listSesi.length; i++) {
    arrayMax.push(listSesi[i].pengurus.length);
  }

  return Math.max(...arrayMax);
}

export default {
  data() {
    return {
      schedules: [],
      isPengurus: true,
    };
  },
  methods: {
    getAllSchedule: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .get("/schedule", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.schedules = response.data.data;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
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
