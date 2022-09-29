<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-4">Kelola Akun Partisipan</h5>
      <div class="d-flex justify-content-between">
        <div>
          <button class="btn btn-add text-light px-4 me-2">
            <i class="fa-sharp fa-magnifying-glass"></i>
            <span class="ps-3 me-2 font-weight-bold">Cari</span>
          </button>

          <RouterLink to="/member/partisipan/add">
            <button class="btn btn-add text-light px-4 me-2">
              <i class="fa-sharp fa-plus"></i>
              <span class="ps-3 font-weight-bold">Tambah Partisipan</span>
            </button>
          </RouterLink>

          <button class="btn btn-add text-light px-4">
            <i class="fa-sharp fa-user-plus"></i>
            <span class="ps-3 font-weight-bold">Tambah Generate</span>
          </button>
        </div>
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
            <th scope="col">Jabatan</th>
            <th scope="col">ID Anggota</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 10" :key="index" class="text-custom-primary">
            <th scope="row">{{ index }}</th>
            <td>58101223020</td>
            <td>Tri Agung</td>
            <td>Ketua Umum</td>
            <td>P58912380323</td>
            <td>
              <div class="d-flex justify-content-around">
                <RouterLink to="/member/partisipan/edit">
                  <div class="text-primary">
                    <i class="fa-solid fa-user-pen me-2"></i>
                    <span>Edit</span>
                  </div>
                </RouterLink>
                <RouterLink to="/member/partisipan">
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
      <div class="d-flex justify-content-center">
        <nav class="text-center">
          <ul class="pagination">
            <li class="page-item disabled">
              <span class="page-link">Previous</span>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <span class="page-link">
                2
                <span class="sr-only">(current)</span>
              </span>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
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
