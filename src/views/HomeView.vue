<script setup>
import Navbar from "../components/Navbar.vue";
import ScheduleCard from "@/components/ScheduleCard.vue";
</script>

<template>
  <Navbar page="home">
    <template #content>
      <div class="d-flex justify-content-between">
        <div>
          <h5><b>Aplikasi Penjadwalan Edukasi harian</b></h5>
          <h6 class="text-primary mt-3">
            <b>
              Kelompok Studi Pasar Modal <br />
              Universitas Teknologi Yogyakarta</b
            >
          </h6>
        </div>
        <img
          alt="KSPM UTY logo"
          class="logo me-4"
          src="@/assets/AppLogo.svg"
          width="90"
          height="90"
        />
      </div>
      <hr />
      <div class="row">
        <div class="col-12 col-md-6 p-4">
          <ScheduleCard
            name="Pengurus"
            v-if="!loading"
            :requested="schedulePengurus.requested"
            :rejected="schedulePengurus.rejected"
            :empty="schedulePengurus.empty"
            :validated="schedulePengurus.validated"
            :accepted="schedulePengurus.accepted"
            :total="schedulePengurus.total"
          />
        </div>
        <div class="col-12 col-md-6 p-4">
          <ScheduleCard
            name="Anggota"
            v-if="!loading"
            :requested="scheduleAnggota.requested"
            :rejected="scheduleAnggota.rejected"
            :empty="scheduleAnggota.empty"
            :validated="scheduleAnggota.validated"
            :accepted="scheduleAnggota.accepted"
            :total="scheduleAnggota.total"
          />
        </div>
        <div class="col-12">
          <div
            id="loadingSpinner"
            v-bind:class="loading ? '' : 'd-none'"
            class="text-center d-flex align-items-center"
            style="height: 370px"
          >
            <div class="w-100">
              <div class="spinner-border text-dark text-center" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Navbar>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  data: function () {
    return {
      loading: false,
      schedulePengurus: {
        requested: 0,
        rejected: 0,
        empty: 0,
        validated: 0,
        accepted: 0,
        total: 0,
      },
      scheduleAnggota: {
        requested: 0,
        rejected: 0,
        empty: 0,
        validated: 0,
        accepted: 0,
        total: 0,
      },
    };
  },
  methods: {
    getScheduleCount: async function () {
      this.loading = true;
      const token = localStorage.getItem("user-token");
      axios
        .get("/schedule/count", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.schedulePengurus = response.data.data.pengurus;
          this.scheduleAnggota = response.data.data.anggota;
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
    this.getScheduleCount();
  },
};
</script>
