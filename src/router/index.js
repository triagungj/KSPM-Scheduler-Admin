import { createRouter, createWebHistory } from "vue-router";
import LoginViewVue from "@/views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ScheduleViewVue from "@/views/ScheduleView.vue";
import MemberViewVue from "@/views/MemberView.vue";
import InfoViewVue from "@/views/InfoView.vue";
import InfoAddViewVue from "@/views/info/InfoAddView.vue";
import InfoEditViewVue from "@/views/info/InfoEditView.vue";
import AdminViewVue from "@/views/AdminView.vue";
import MemberPetugasViewVue from "@/views/member/MemberPetugasView.vue";
import MemberAddPetugasViewVue from "@/views/member/MemberAddPetugasView.vue";
import MemberEditPetugasViewVue from "@/views/member/MemberEditPetugasView.vue";
import MemberPartisipanViewVue from "@/views/member/MemberPartisipanView.vue";
import MemberAddPartisipanViewVue from "@/views/member/MemberAddPartisipanView.vue";
import MemberEditPartisipanViewVue from "@/views/member/MemberEditPartisipanView.vue";
import MasterViewVue from "@/views/MasterView.vue";
import AdminChangePasswordVue from "@/views/admin/AdminChangePassword.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginViewVue,
  },
  {
    path: "/schedule",
    name: "schedule",
    component: ScheduleViewVue,
  },
  {
    path: "/member",
    name: "member",
    component: MemberViewVue,
  },
  {
    path: "/member/petugas",
    name: "memberPetugas",
    component: MemberPetugasViewVue,
  },
  {
    path: "/member/petugas/add",
    name: "memberAddPetugas",
    component: MemberAddPetugasViewVue,
  },
  {
    path: "/member/petugas/edit/:id",
    name: "memberEditPetugas",
    component: MemberEditPetugasViewVue,
  },
  {
    path: "/member/partisipan",
    name: "memberPartisipan",
    component: MemberPartisipanViewVue,
  },
  {
    path: "/member/partisipan/add",
    name: "memberAddPartisipan",
    component: MemberAddPartisipanViewVue,
  },
  {
    path: "/member/partisipan/edit/:id",
    name: "memberEditPartisipan",
    component: MemberEditPartisipanViewVue,
  },

  {
    path: "/master",
    name: "master",
    component: MasterViewVue,
  },
  {
    path: "/info",
    name: "info",
    component: InfoViewVue,
  },
  {
    path: "/info/add",
    name: "infoAdd",
    component: InfoAddViewVue,
  },
  {
    path: "/info/edit/:id",
    name: "infoEdit",
    component: InfoEditViewVue,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminViewVue,
  },
  {
    path: "/admin/password-change",
    name: "adminPasswordChange",
    component: AdminChangePasswordVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
