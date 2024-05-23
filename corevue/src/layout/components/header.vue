<template >
    <header>
			<div class="topbar d-flex align-items-center">
				<nav class="navbar navbar-expand">
					<div class="topbar-logo-header">
						<div class="">
							<img src="../../assets/assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
						</div>
						<div class="">
							<h4 class="logo-text">Rocker</h4>
						</div>
					</div>
					<div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
					<div class="search-bar flex-grow-1">
					</div>
					<div class="top-menu ms-auto">
						<ul class="navbar-nav align-items-center">
						</ul>
					</div>
					<div class="user-box dropdown">
						<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="../../assets/assets/images/avatars/avatar-2.png" class="user-img" alt="user avatar">
							<div class="user-info ps-3">
								<p class="user-name mb-0">{{user?.email}}</p>
								<p class="designattion mb-0">{{user?.role}}</p>
								
							</div>
														<div class="user-info ps-3">
															                <a class="user-name mb-0 nav-link" href="/" @click="logout">
                  Logout
                </a>
								
							</div>

						</a>
					</div>
				</nav>
			</div>
		</header>
</template>
<script>


import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      token: "",
      user: null,
    };
  },
  computed: {
    ...mapGetters(["cartItems", "cartItemCount", "cartTotal"]),
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
      // Redirect to the login page
      this.$router.push('/');
      // Clear local data
      this.token = "";
      this.user = null;
    }
  },
  created() {
    // Retrieve the token from localStorage
    this.token = localStorage.getItem("token");
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>
<style></style>