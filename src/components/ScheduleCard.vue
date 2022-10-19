<template>
  <div class="bg-custom-primary rounded text-center text-light px-4 py-4">
    <h6 class="mb-2">
      <b>Jadwal {{ name }}</b>
    </h6>
    <div class="d-flex mt-4 justify-content-around">
      <div>
        <div class="rounded-circle schedule-button mx-auto">
          <img src="@/assets/icons/schedule/CalendarClock.svg" alt="calendar" />
          <h6 class="text-danger text-small mt-2">{{ requested }}</h6>
        </div>
        <span class="mt-1 text-small-600">Belum tervalidasi</span>
      </div>
      <div>
        <div class="rounded-circle schedule-button mx-auto">
          <img src="@/assets/icons/schedule/CalendarError.svg" alt="calendar" />
          <h6 class="text-danger text-small mt-2">{{ rejected }}</h6>
        </div>
        <span class="mt-1 text-small-600">Ditolak</span>
      </div>
      <div>
        <div class="rounded-circle schedule-button mx-auto">
          <img src="@/assets/icons/schedule/CalendarEmpty.svg" alt="calendar" />
          <h6 class="text-danger text-small mt-2">{{ empty }}</h6>
        </div>
        <span class="mt-1 text-small-600">Belum Menginput</span>
      </div>
    </div>
    <div class="d-flex mt-4 justify-content-around">
      <div>
        <div class="rounded-circle schedule-button mx-auto">
          <img src="@/assets/icons/schedule/CalendarEdit.svg" alt="calendar" />
          <h6 class="text-custom-primary text-small mt-2">{{ validated }}</h6>
        </div>
        <span class="mt-1 text-small-600">Tervalidasi</span>
      </div>
      <div>
        <div class="rounded-circle schedule-button mx-auto">
          <img
            src="@/assets/icons/schedule/CalendarCheckmark.svg"
            alt="calendar"
          />
          <h6 class="text-custom-primary text-small mt-2">{{ accepted }}</h6>
        </div>
        <span class="mt-1 text-small-600">Diterima</span>
      </div>
      <div>
        <div class="rounded-circle schedule-button mx-auto">
          <img
            src="@/assets/icons/schedule/CalendarPerson.svg"
            alt="calendar"
          />
          <h6 class="text-custom-primary text-small mt-2">{{ total }}</h6>
        </div>
        <span class="mt-1 text-small-600">Total {{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    requested: Number,
    rejected: Number,
    empty: Number,
    validated: Number,
    accepted: Number,
    total: Number,
  },
};
</script>

<style scoped>
.schedule-button {
  background-color: #e7e0ec;
  padding: 10px;
  width: 75px;
  height: 75px;
}
</style>
