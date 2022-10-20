<script setup>
import Modal from "./Modal.vue";

function openNav() {
  document.getElementById("sidebarNav").style.width = "20%";
  document.getElementById("main").style.marginLeft = "20%";
  document.getElementById("navigationCloseButton").classList.add("d-flex");
  document.getElementById("navigationCloseButton").classList.remove("d-none");
  document.getElementById("navigationButton").classList.add("d-none");
  document.getElementById("navigationButton").classList.remove("d-flex");
}
function closeNav() {
  document.getElementById("sidebarNav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("navigationCloseButton").classList.add("d-none");
  document.getElementById("navigationCloseButton").classList.remove("d-flex");
  document.getElementById("navigationButton").classList.add("d-flex");
  document.getElementById("navigationButton").classList.remove("d-none");
}
</script>

<template>
  <div class="w-100 d-flex">
    <div id="sidebarNav" class="sidebar vh-100 p-0">
      <div class="bg-light w-100 text-center py-3 border border-primary">
        <img
          alt="KSPM UTY logo"
          class="applogo mx-2"
          src="@/assets/AppLogo.svg"
        />
      </div>
      <div class="menu text-light pt-4">
        <nav>
          <RouterLink to="/" class="w-100">
            <li v-bind:class="{ active: page === 'home' }">
              <span class="align-middle icon icon-home"></span>
              <span class="align-middle ms-3 menu-label">Home</span>
            </li>
          </RouterLink>
          <RouterLink to="/schedule" class="w-100">
            <li v-bind:class="{ active: page === 'schedule' }">
              <span class="align-middle icon icon-schedule"></span>
              <span class="align-middle ms-3 menu-label">Kelola Jadwal</span>
            </li>
          </RouterLink>
          <RouterLink to="/member" class="w-100">
            <li v-bind:class="{ active: page === 'member' }">
              <span class="align-middle icon icon-member"></span>
              <span class="align-middle ms-3 menu-label"
                >Kelola Akun Pengguna</span
              >
            </li>
          </RouterLink>
          <RouterLink to="/master" class="w-100">
            <li v-bind:class="{ active: page === 'master' }">
              <span class="align-middle icon icon-master"></span>
              <span class="align-middle ms-3 menu-label">Master Data</span>
            </li>
          </RouterLink>
          <RouterLink to="/info" class="w-100">
            <li v-bind:class="{ active: page === 'info' }">
              <span class="align-middle icon icon-info"></span>
              <span class="align-middle ms-3 menu-label">Update Info</span>
            </li>
          </RouterLink>
          <div style="min-height: 50px"></div>
          <RouterLink to="/admin" class="w-100">
            <li v-bind:class="{ active: page === 'admin' }">
              <span class="align-middle icon icon-admin"></span>
              <span class="align-middle ms-3 menu-label">Akun Admin</span>
            </li>
          </RouterLink>
        </nav>
      </div>
    </div>

    <div id="main" class="w-100 main bg-custom-outline">
      <div class="w-100 navbar-top pr-4 text-right">
        <div class="d-flex justify-content-between">
          <div>
            <button
              id="navigationButton"
              @click="openNav()"
              class="navigation-button p-2"
            >
              <span class="icon icon-navigation"></span>
            </button>
            <button
              id="navigationCloseButton"
              @click="closeNav()"
              class="navigation-close-button p-2"
            >
              <span class="icon icon-arrow"></span>
            </button>
          </div>

          <button
            class="logout-button p-2 me-4"
            data-bs-toggle="modal"
            data-bs-target="#logoutmodal"
          >
            <span class="align-middle text-light">Logout</span>
            <span class="align-middle ms-2 icon icon-logout"></span>
          </button>

          <div
            class="modal fade"
            id="logoutmodal"
            tabindex="-1"
            aria-hidden="true"
          >
            <Modal title="Keluar Akun">
              <template #modalContent>
                <img src="@/assets/ilustrasions/SignoutIlu.svg" alt="signout" />
                <p class="mt-4 p-0">Anda akan diarahkan ke halaman Login</p>
              </template>
              <template #buttonConfirm>
                <div>
                  <button
                    type="button"
                    class="btn btn-danger w-100"
                    data-bs-dismiss="modal"
                    v-on:click="postLogout()"
                  >
                    Logout
                  </button>
                </div>
              </template>
            </Modal>
          </div>
        </div>
      </div>
      <div class="m-3">
        <div class="bg-light rounded p-4" style="min-height: 580px">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "comp-navbar",
  props: {
    page: String,
  },
  methods: {
    postLogout: async function () {
      const token = localStorage.getItem("user-token");
      axios
        .post("/logout", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          toast.success("Berhasil Logout!", {
            timeout: 2000,
          });
          var delayInMilliseconds = 1000; //1 second

          setTimeout(function () {
            router.push("/login");
          }, delayInMilliseconds);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            timeout: 2000,
          });
          var delayInMilliseconds = 1000; //1 second

          setTimeout(function () {
            router.push("/login");
          }, delayInMilliseconds);
        });
      localStorage.removeItem("user-token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.sidebar {
  background-color: #6750a4;
  height: 100%;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 60px;
  transition: 0.2s;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.main {
  transition: 0.2s;
}

nav li {
  list-style: none;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: start;
  color: #ffffff;
  text-decoration: none;
  transition: 0.2s;
  vertical-align: bottom;
}
nav li:hover,
nav .active {
  background-color: #d9d9d9;
  color: #6750a4;
}
.navbar-top {
  background-color: #6750a4;
}

.navigation-button,
.navigation-close-button {
  background-color: transparent;
  border: none;
}

@media screen and (max-width: 912px) {
  .sidebar {
    width: 0%;
  }
  .main {
    margin-left: 0;
  }
  .navigation-button {
    display: flex;
  }
  .navigation-close-button {
    display: none;
  }
  .applogo {
    width: 80px;
  }
  .menu nav li {
    text-align: center;
  }
  .menu nav li .menu-label {
    display: none;
  }
}
@media screen and (min-width: 912px) {
  .sidebar {
    width: 20%;
  }
  .main {
    margin-left: 20%;
  }
  .navigation-button {
    display: none;
  }
  .navigation-close-button {
    display: flex;
  }
}

.icon {
  display: inline-block;
  width: 27px;
  height: 30px;
  background-size: cover;
}

.icon-home {
  transition: 0.2s;
  background-image: url("@/assets/icons/HomeOutline.svg");
}
nav li:hover .icon-home,
nav .active .icon-home {
  background-image: url("@/assets/icons/Home.svg");
}
.icon-schedule {
  transition: 0.2s;
  background-image: url("@/assets/icons/CalendarOutline.svg");
}
nav li:hover .icon-schedule,
nav .active .icon-schedule {
  background-image: url("@/assets/icons/Calendar.svg");
}
.icon-member {
  transition: 0.2s;
  background-image: url("@/assets/icons/PersonOutlined.svg");
}

nav li:hover .icon-member,
nav .active .icon-member {
  background-image: url("@/assets/icons/Person.svg");
}
.icon-info {
  transition: 0.2s;
  background-image: url("@/assets/icons/InfoOutlined.svg");
}
nav li:hover .icon-info,
nav .active .icon-info {
  background-image: url("@/assets/icons/Info.svg");
}
.icon-master {
  transition: 0.2s;
  background-image: url("@/assets/icons/DatabaseOutlined.svg");
}
nav li:hover .icon-master,
nav .active .icon-master {
  background-image: url("@/assets/icons/Database.svg");
}

.icon-admin {
  transition: 0.2s;
  background-image: url("@/assets/icons/PersonKeyOutlined.svg");
}

nav li:hover .icon-admin,
nav .active .icon-admin {
  background-image: url("@/assets/icons/PersonKey.svg");
}

.logout-button {
  background-color: transparent;
  border: none;
  transition: 0.2s;
}
.logout-button:hover {
  background-color: #b32d2b;
}
.icon-logout {
  transition: 0.2s;
  background-image: url("@/assets/icons/SignOut.svg");
}
.icon-navigation {
  transition: 0.2s;
  background-image: url("@/assets/icons/Navigation.svg");
}
.icon-arrow {
  transition: 0.2s;
  background-image: url("@/assets/icons/ArrowLeft.svg");
}
</style>
