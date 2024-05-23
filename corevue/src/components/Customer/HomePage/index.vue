<template>
  <div class="container">
    <section
      class="hero pb-3 bg-cover bg-center d-flex align-items-center"
      style="background: url(src/assets/assetsshop/img/canen.jpg)"
    >
      <div class="container py-5">
        <div class="row px-4 px-lg-5">
          <div class="col-lg-6">
            <p class="text-dark small text-uppercase mb-2">
              New Inspiration 2024
            </p>
            <h1 class="h2 text-uppercase mb-3">20% off on new season</h1>
            <a class="btn btn-dark" href="shop.html">Browse collections</a>
          </div>
        </div>
      </div>
    </section>
    <!-- CATEGORIES SECTION-->
    <section class="pt-5">
      <header class="text-center">
        <p class="small text-muted small text-uppercase mb-1">
          Carefully created collections
        </p>
        <h2 class="h5 text-uppercase mb-4">Browse our categories</h2>
      </header>
      <div class="row">
        <div class="col-md-4" v-for="item in mappedCategories" :key="item.id">
          <router-link
            class="category-item"
            :to="{
              name: 'ShopCategory',
              params: { catName: item.catName },
            }"
            ><img
              class="img-fluid"
              :src="item.photo"
              width="400"
              height="300"
              alt=""
            /><strong class="category-item-title">{{ item.catName }}</strong>
          </router-link>
        </div>
      </div>
    </section>
    <!-- TRENDING PRODUCTS-->
    <section class="py-5">
      <header>
        <p class="small text-muted small text-uppercase mb-1">
          Made the hard way
        </p>
        <h2 class="h5 text-uppercase mb-4">Top trending products</h2>
      </header>
      <div class="row">
        <!-- PRODUCT-->
        <div
          class="col-xl-3 col-lg-4 col-sm-6"
          v-for="item in mappedProducts"
          :key="item.id"
        >
          <div class="product text-center">
            <div class="position-relative mb-3">
              <div class="badge text-white bg-"></div>

              <a class="d-block" :href="`/detail/${item.id}`"
                ><img class="img-fluid w-100" :src="item.image" alt="..."
              /></a>
              <div class="product-overlay">
                <ul class="mb-0 list-inline">
                  <li class="list-inline-item m-0 p-0">
                    <a class="btn btn-sm btn-outline-dark" :href="`/detail/${item.id}`"
                      ><i class="far fa-heart"></i
                    ></a>
                  </li>
                  <li class="list-inline-item m-0 p-0">
                    <a class="btn btn-sm btn-dark" @click="addToCart(item)"
                      >Add to cart</a
                    >
                  </li>
                  <li class="list-inline-item me-0">
                    <a
                      class="btn btn-sm btn-outline-dark"
                      href="#productView"
                      data-bs-toggle="modal"
                      ><i class="fas fa-expand"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
            <h6>
              <a class="reset-anchor" :href="`/detail/${item.id}`">{{ item.name }}</a>
            </h6>
            <p class="small text-muted">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- SERVICES-->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row text-center gy-3">
          <div class="col-lg-4">
            <div class="d-inline-block">
              <div class="d-flex align-items-end">
                <svg class="svg-icon svg-icon-big svg-icon-light">
                  <use xlink:href="#delivery-time-1"></use>
                </svg>
                <div class="text-start ms-3">
                  <h6 class="text-uppercase mb-1">Free shipping</h6>
                  <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="d-inline-block">
              <div class="d-flex align-items-end">
                <svg class="svg-icon svg-icon-big svg-icon-light">
                  <use xlink:href="#helpline-24h-1"></use>
                </svg>
                <div class="text-start ms-3">
                  <h6 class="text-uppercase mb-1">24 x 7 service</h6>
                  <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="d-inline-block">
              <div class="d-flex align-items-end">
                <svg class="svg-icon svg-icon-big svg-icon-light">
                  <use xlink:href="#label-tag-1"></use>
                </svg>
                <div class="text-start ms-3">
                  <h6 class="text-uppercase mb-1">Festivaloffers</h6>
                  <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- NEWSLETTER-->
    <section class="py-5">
      <div class="container p-0">
        <div class="row gy-3">
          <div class="col-lg-6">
            <h5 class="text-uppercase">Let's be friends!</h5>
            <p class="text-sm text-muted mb-0">
              Nisi nisi tempor consequat laboris nisi.
            </p>
          </div>
          <div class="col-lg-6">
            <form action="#">
              <div class="input-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Enter your email address"
                  aria-describedby="button-addon2"
                />
                <button class="btn btn-dark" id="button-addon2" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const categories = ref([]);
    const products = ref([]);
    const cartItems = ref([]);

    const store = useStore();

    // Use Vuex actions
    const addToCart = (item) => {
      store.dispatch("addToCart", item);
      alert("Thêm vào giỏ hàng thành công");
    };

    const removeFromCart = (item) => {
      store.dispatch("removeFromCart", item);
      alert("Xóa khỏi giỏ hàng thành công");
    };

    // Use Vuex getters
    const vuexCartItems = computed(() => store.getters.cartItems);
    const cartItemCount = computed(() => store.getters.cartItemCount);
    const cartTotal = computed(() => store.getters.cartTotal);

    // Load cart items from localStorage on component mount
    onMounted(() => {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (storedCartItems) {
        cartItems.value = storedCartItems;
      } else {
        localStorage.setItem("cartItems", JSON.stringify([]));
        cartItems.value = [];
      }
    });

    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/");
        categories.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        products.value = response.data.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getCategories();
      getProducts();
    });

    return {
      categories,
      products,
      cartItems,
      addToCart,
      removeFromCart,
      vuexCartItems,
      cartItemCount,
      cartTotal,
    };
  },
  computed: {
    mappedCategories() {
      return this.categories.map((category) => {
        if (category) {
          return {
            id: category.id,
            catName: category.catName,
            photo: category.photo,
          };
        }
      });
    },
    mappedProducts() {
      return this.products.map((product) => {
        if (product) {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
          };
        }
      });
    },
  },
};
</script>
<style>
@import "src/assets/assetsshop/css/style.default.css";
</style>
