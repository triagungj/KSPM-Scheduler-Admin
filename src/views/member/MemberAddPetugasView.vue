<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="member">
    <template #content>
      <h5 class="mb-3">Buat Akun Petugas</h5>
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
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrevielege"
              id="radioSuperUser"
            />
            <label class="form-check-label" for="radioSuperUser">
              Superuser
            </label>
          </div>
          <div class="form-check ms-4">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrevielege"
              id="radioDefaultUser"
              checked
            />
            <label class="form-check-label" for="radioDefaultUser">
              Default
            </label>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-2">
          <RouterLink to="/member/petugas">
            <button
              type="submit"
              class="btn btn-register text-light text-center"
            >
              Buat Akun
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
