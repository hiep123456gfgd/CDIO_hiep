<template>
  <body class="bg-login">
    <!--wrapper-->
    <div class="wrapper">
      <div
        class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0"
      >
        <div class="container-fluid">
          <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div class="col mx-auto">
              <div class="mb-4 text-center">
                <img src="assets/images/logo-img.png" width="180" alt="" />
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="border p-4 rounded">
                    <div class="text-center">
                      <h3 class="">Sign in Customer</h3>
                      <p>
                        Don't have an account yet?
                        <a href="authentication-signup.html">Sign up here</a>
                      </p>
                    </div>
                    <div @submit.prevent="login" class="form-body">
                      <form class="row g-3">
                        <div class="col-12">
                          <label for="inputEmailAddress" class="form-label"
                            >Email Address</label
                          >
                          <input
                            type="email"
                            class="form-control"
                            id="inputEmailAddress"
                            placeholder="Email Address"
                            v-model="email"
                          />
                        </div>
                        <div class="col-12">
                          <label for="inputChoosePassword" class="form-label"
                            >Enter Password</label
                          >
                          <div class="input-group" id="show_hide_password">
                            <input
                              type="password"
                              class="form-control border-end-0"
                              id="inputChoosePassword"
                              placeholder="Enter Password"
                              v-model="password"
                            />
                            <a
                              href="javascript:;"
                              class="input-group-text bg-transparent"
                              ><i class="bx bx-hide"></i
                            ></a>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              checked
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckChecked"
                              >Remember Me</label
                            >
                          </div>
                        </div>
                        <div class="col-md-6 text-end">
                          <a href="authentication-forgot-password.html"
                            >Forgot Password ?</a
                          >
                        </div>
                        <div class="col-12">
                          <div class="d-grid">
                            <button type="submit" class="btn btn-primary">
                              <i class="bx bxs-lock-open"></i>Sign in
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end row-->
        </div>
      </div>
    </div>
    <!--end wrapper-->
    <!-- Bootstrap JS -->
  </body>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    login() {
      // Clear previous errors
      this.errors = [];

      // Send login request to the server
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Handle successful login here
          // For example, save the token and redirect
          console.log("Login successful:", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          this.$router.push("/");
        })
        .catch((e) => {
          // Handle errors
          if (e.response && e.response.data && e.response.data.errors) {
            this.errors = e.response.data.errors;
          } else {
            this.errors.push({
              message: "Đã xảy ra lỗi trong quá trình đăng nhập.",
            });
          }
        });
    },
  },
};
</script>

<style></style>
