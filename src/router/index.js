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
import MasterSesiViewVue from "@/views/master/MasterSesiView.vue";
import MasterSesiAddViewVue from "@/views/master/MasterSesiAddView.vue";
import MasterSesiEditViewVue from "@/views/master/MasterSesiEditView.vue";
import MasterPertemuanViewVue from "@/views/master/MasterPertemuanView.vue";
import MasterPertemuanAddViewVue from "@/views/master/MasterPertemuanAddView.vue";
import MasterPertemuanEditViewVue from "@/views/master/MasterPertemuanEditView.vue";
import MasterJabatanViewVue from "@/views/master/MasterJabatanView.vue";
import MasterJabatanCategoryViewVue from "@/views/master/MasterJabatanCategoryView.vue";
import AdminChangePasswordVue from "@/views/admin/AdminChangePassword.vue";
import MasterJabatanAddViewVue from "@/views/master/MasterJabatanAddView.vue";
import MasterJabatanEditViewVue from "@/views/master/MasterJabatanEditView.vue";
import MasterJabatanCategoryAddViewVue from "@/views/master/MasterJabatanCategoryAddView.vue";
import MasterJabatanCategoryEditViewVue from "@/views/master/MasterJabatanCategoryEditView.vue";

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
    path: "/master/sesi",
    name: "masterSesi",
    component: MasterSesiViewVue,
  },
  {
    path: "/master/sesi/add",
    name: "masterSesiAdd",
    component: MasterSesiAddViewVue,
  },
  {
    path: "/master/sesi/edit/:id",
    name: "masterSesiEdit",
    component: MasterSesiEditViewVue,
  },
  {
    path: "/master/pertemuan",
    name: "masterPertemuan",
    component: MasterPertemuanViewVue,
  },
  {
    path: "/master/pertemuan/add",
    name: "masterPertemuanAdd",
    component: MasterPertemuanAddViewVue,
  },
  {
    path: "/master/pertemuan/edit/:id",
    name: "masterPertemuanEdit",
    component: MasterPertemuanEditViewVue,
  },
  {
    path: "/master/jabatan",
    name: "masterJabatan",
    component: MasterJabatanViewVue,
  },
  {
    path: "/master/jabatan/add",
    name: "masterJabatanAdd",
    component: MasterJabatanAddViewVue,
  },
  {
    path: "/master/jabatan/edit/:id",
    name: "masterJabatanEdit",
    component: MasterJabatanEditViewVue,
  },
  {
    path: "/master/jabatan-category",
    name: "masterJabatanCategory",
    component: MasterJabatanCategoryViewVue,
  },
  {
    path: "/master/jabatan-category/add",
    name: "masterJabatanCategoryAdd",
    component: MasterJabatanCategoryAddViewVue,
  },
  {
    path: "/master/jabatan-category/edit/:id",
    name: "masterJabatanCategoryEdit",
    component: MasterJabatanCategoryEditViewVue,
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
