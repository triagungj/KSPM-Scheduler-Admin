<template>
  <div class="info-card d-flex my-2">
    <RouterLink v-bind:to="detailUrl">
      <div class="bg-custom-primary p-3 rounded me-3 d-flex align-items-center">
        <img src="@/assets/icons/InfoCardIcon.svg" />
      </div>
    </RouterLink>
    <div class="w-100 d-inline">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <RouterLink v-bind:to="detailUrl">
            <h6 class="my-0 text-dark">
              {{ title }}
            </h6>
          </RouterLink>
          <span class="ms-3 text-info"
            ><RouterLink v-bind:to="editUrl"> Edit </RouterLink> |
            <RouterLink v-bind:to="detailUrl"> Hapus </RouterLink>
          </span>
        </div>

        <span class="text-info">{{ date }}</span>
      </div>
      <RouterLink v-bind:to="detailUrl">
        <p class="m-0 pt-1 info-detail text-dark">
          {{ detail }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  props: {
    title: String,
    detail: String,
    date: String,
    detailUrl: String,
    editUrl: String,
  }
};
</script>

<style scoped>
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
