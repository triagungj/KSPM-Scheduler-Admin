<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-4">Kelola Akun Petugas</h5>
      <div class="d-flex justify-content-between">
        <RouterLink to="/member/petugas/add">
          <button class="btn btn-add text-light px-4">
            <i class="fa-sharp fa-plus"></i>
            <span class="ps-3 font-weight-bold">Tambah Petugas</span>
          </button>
        </RouterLink>
        <button class="btn btn-danger text-light px-4">
          <span class="pe-3 font-weight-bold">Hapus Semua</span>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <table class="table mt-2 content-table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Username</th>
            <th scope="col">Nama</th>
            <th scope="col">Superuser</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 3" :key="index" class="text-custom-primary">
            <th scope="row">{{ index }}</th>
            <td>triagungj</td>
            <td>Tri Agung</td>
            <td>YES</td>
            <td>
              <div class="d-flex justify-content-around">
                <RouterLink to="/member/petugas/edit">
                  <div class="text-primary">
                    <i class="fa-solid fa-user-pen me-2"></i>
                    <span>Edit</span>
                  </div>
                </RouterLink>
                <RouterLink to="/member/petugas">
                  <div class="text-danger">
                    <i class="fa-solid fa-trash me-2"></i>
                    <span>Hapus</span>
                  </div>
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </Navbar>
</template>

<style scoped>
.btn-add {
  background-color: #6750a4;
}
.btn-add:hover {
  background-color: #9875f9;
}

.content-table th {
  font-weight: bold;
}
.content-table th,
.content-table td {
  border: 1px solid #6750a4;
  text-align: center;
}
.content-table thead {
  background-color: #d9d9d9;
  color: #6750a4;
}
</style>
