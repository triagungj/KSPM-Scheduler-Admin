<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <Navbar page="info">
    <template #content>
      <h5 class="mb-3">Edit Info</h5>
      <form class="w-100">
        <div class="row">
          <div class="col-12 my-1">
            <div class="form-group">
              <label for="inputTitle">Judul</label>
              <input
                type="text"
                class="form-control"
                id="inputTitle"
                placeholder="Judul"
                value="Pemberitahuan Libur Kegiatan Edukasi Perihal UAS"
              />
            </div>
          </div>
          <div class="col-12 my-1">
            <div class="form-group">
              <label for="inputDescription">Deskripsi</label>
              <textarea
                type="textarea"
                rows="5"
                class="form-control"
                id="inputDescription"
                placeholder="Deskripsi"
                value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus nihil obcaecati eligendi facilis aliquid beatae aut similique corrupti quas. Molestias debitis in perspiciatis repellat necessitatibus sequi eligendi quae consectetur nostrum! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed repellendus eveniet culpa dolor a. Cumque, eum sunt, quam quae et natus placeat voluptatibus ipsa exercitationem minima blanditiis inventore eius fuga."
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <RouterLink to="/info">
            <button type="submit" class="btn btn-add text-light text-center">
              Edit Info
            </button>
          </RouterLink>
        </div>
      </form>
    </template>
  </Navbar>
</template>

<style scoped>
.btn-add {
  background-color: #6750a4;
  padding-left: 100px;
  padding-right: 100px;
}
.btn-add:hover {
  background-color: #8568d3;
}
</style>
