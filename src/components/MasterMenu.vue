<template>
  <div class="d-flex mt-4">
    <RouterLink
      to="/master/sesi"
      class="btn-label me-1"
      v-bind:class="{ 'label-active text-bold': page === 'sesi' }"
    >
      Sesi
    </RouterLink>
    <RouterLink
      to="/master/pertemuan"
      class="btn-label me-1"
      v-bind:class="{ 'label-active text-bold': page === 'pertemuan' }"
    >
      Pertemuan
    </RouterLink>
    <RouterLink
      to="/master/jabatan"
      class="btn-label me-1"
      v-bind:class="{ 'label-active text-bold': page === 'jabatan' }"
    >
      Jabatan
    </RouterLink>
    <RouterLink
      to="/master/jabatan-category"
      class="btn-label me-1"
      v-bind:class="{ 'label-active text-bold': page === 'jabatan-category' }"
    >
      Kategori Jabatan
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    page: String,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
