<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <Navbar page="member">
    <template #content>
      <div>
        <div
          class="row d-flex align-items-center justify-content-around"
          style="height: 500px"
        >
          <div class="col-6 col-xs-6 col-md-5 col-lg-4 text-center">
            <RouterLink to="/member/petugas">
              <div class="card-content card p-5">
                <img
                  alt="Vue logo"
                  class="w-100"
                  src="@/assets/icons/PersonLabel.svg"
                  width="125"
                  height="125"
                />
                <h3 class="text-light mt-4">Akun Petugas</h3>
              </div>
            </RouterLink>
          </div>
          <div class="col-6 col-xs-6 col-md-5 col-lg-4 text-center">
            <RouterLink to="/member/partisipan">
              <div class="card-content card p-5">
                <img
                  alt="Vue logo"
                  class="w-100"
                  src="@/assets/icons/PersonOutlined.svg"
                  width="125"
                  height="125"
                />
                <h3 class="text-light mt-4">Akun Partisipan</h3>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </template>
  </Navbar>
</template>

<style scoped>
.card-content {
  border-radius: 30px;
  background-color: #6750a4;
}
</style>
