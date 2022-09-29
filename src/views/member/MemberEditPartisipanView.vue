<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-3">Edit Akun Partisipan</h5>
      <form class="w-100">
        <div class="row">
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputUsername">Username</label>
              <input
                type="text"
                class="form-control"
                id="inputUsername"
                placeholder="Username"
                value="518082038"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputNamaLengkap">Nama Lengkap</label>
              <input
                type="text"
                class="form-control"
                id="inputNamaLengkap"
                placeholder="Nama Lengkap"
                value="Tri Agung Jiwandono"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <label for="selectJabatan">Jabatan</label>

            <select id="selectJabatan" class="form-select">
              <option hidden>-</option>
              <option value="1" selected>Ketua Umum</option>
              <option value="2">Bendahara Umum</option>
              <option value="3">Staff HRD</option>
              <option value="3">Anggota Magang</option>
            </select>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputIdAnggota">ID Anggota</label>
              <input
                type="text"
                class="form-control"
                id="inputIdAnggota"
                placeholder="ID Anggota"
                value="P527372732"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <div class="form-group">
              <label for="inputNomorWhatsapp">Nomor Whatsapp</label>
              <input
                type="text"
                class="form-control"
                id="inputNomorWhatsapp"
                placeholder="628236534xxx"
                value="628232321342"
              />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <RouterLink to="/member/partisipan">
            <button
              type="submit"
              class="btn btn-register text-light text-center"
            >
              Edit Akun
            </button>
          </RouterLink>
        </div>
      </form>
    </template>
  </Navbar>
</template>

<style scoped>
.btn-register {
  background-color: #6750a4;
  padding-left: 100px;
  padding-right: 100px;
}
.btn-register:hover {
  background-color: #8568d3;
}
</style>
