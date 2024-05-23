<template>
  <div class="wrapper">
    <!--start header -->
    <headerVue></headerVue>
    <!--end header -->
    <!--navigation-->
    <menuVue></menuVue>
    <!--end navigation-->
    <!--start page wrapper -->
    <div class="page-wrapper">
      <div class="page-content">
        <router-view> </router-view>
      </div>
    </div>
    <!--end page wrapper -->
    <!--start overlay-->
    <div class="overlay toggle-icon"></div>
    <!--end overlay-->
    <!--Start Back To Top Button-->
    <a href="javaScript:;" class="back-to-top"
      ><i class="bx bxs-up-arrow-alt"></i
    ></a>
    <!--End Back To Top Button-->
    <footerVue></footerVue>
  </div>
  <!--end wrapper-->
  <!--start switcher-->
</template>
<script>
import "../../assets/assets/js/bootstrap.bundle.min.js";
import "../../assets/assets/js/jquery.min.js";
import "../../assets/assets/plugins/simplebar/js/simplebar.min.js";
import "../../assets/assets/plugins/metismenu/js/metisMenu.min.js";
import "../../assets/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
import "../../assets/assets/js/index.js";
import "../../assets/assets/js/app.js";
import headerVue from "../components/header.vue";
import menuVue from "../components/menu.vue";
import footerVue from "../components/footer.vue";
export default {
  name: "app",
  components: {
    headerVue,
    menuVue,
    footerVue,
  },
};
</script>
<style>
@import "../../assets/assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/assets/css/bootstrap.min.css";
@import "../../assets/assets/css/bootstrap-extended.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import "../../assets/assets/css/app.css";
@import "../../assets/assets/css/icons.css";
@import "../../assets/assets/css/dark-theme.css";
@import "../../assets/assets/css/semi-dark.css";
@import "../../assets/assets/css/header-colors.css";
</style>
