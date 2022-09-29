<script setup>
import Navbar from "../components/Navbar.vue";
import InfoCard from "../components/InfoCard.vue";
</script>

<template>
  <header>
    <Navbar page="info">
      <template #content>
        <h5 class="mb-4">Kelola Info</h5>
        <RouterLink to="/info/add">
          <button class="btn btn-add text-light px-4 me-2">
            <i class="fa-sharp fa-plus"></i>
            <span class="ps-3 font-weight-bold">Tambah Info</span>
          </button>
        </RouterLink>
        <hr />
        <InfoCard
          v-for="index in 10"
          :key="index"
          title="Pemberitahuan Libur Kegiatan Edukasi Perihal UAS"
          detail="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel incidunt debitis, quam quia velit illum quaerat cum. At blanditiis, porro sint ex quidem ut totam sit maxime modi quia!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel incidunt debitis, quam quia velit illum quaerat cum. At blanditiis, porro sint ex quidem ut totam sit maxime modi quia!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel incidunt debitis, quam quia velit illum quaerat cum. At blanditiis, porro sint ex quidem ut totam sit maxime modi quia!"
          date="Senin, 27 Mei 2022"
          detailUrl="/info/add"
          editUrl="/info/edit"
        />
      </template>
    </Navbar>
  </header>
</template>

<style scoped>
.btn-add {
  background-color: #6750a4;
}
.btn-add:hover {
  background-color: #9875f9;
}
</style>
