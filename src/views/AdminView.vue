<template>
  <header>
    <Navbar page="admin">
      <template #content>
        <div class="p-3">
          <h4>Update Akun Admin</h4>
          <h6>
            Ingin mengganti Password Admin?
            <RouterLink :to="{ name: 'adminPasswordChange' }"
              >Ganti Password</RouterLink
            >
          </h6>
          <div class="row mt-3">
            <div class="col-12 my-1">
              <div class="form-group">
                <label for="inputTitle">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputTitle"
                  placeholder="Username"
                  v-model="username"
                />
              </div>
            </div>
            <div class="col-12 my-1">
              <div class="form-group">
                <label for="inputDescription">Nomor Whatsapp</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputTitle"
                  placeholder="628xxxxxx"
                  v-model="phoneNumber"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex justify-content-center mt-4">
                <button
                  @click="updateProfile"
                  class="btn btn-primary text-center px-5 text-light shadow-none"
                >
                  Update Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Navbar>
  </header>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "admin-view",
  components: {
    Navbar,
  },
  data() {
    return {
      username: "",
      phoneNumber: "",
    };
  },
  methods: {
    getProfile: async function () {
      const token = localStorage.getItem("user-token");

      axios
        .get("/profile", {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.username = response.data.data.username;
          this.phoneNumber = response.data.data.phone_number;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
    },
    updateProfile: async function () {
      const token = localStorage.getItem("user-token");
      const body = { username: this.username, phone_number: this.phoneNumber };

      axios
        .post("/update", body, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          2;
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
        });
      console.log(body);
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>
