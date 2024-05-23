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

              <a class="d-block" href="/"
                ><img class="img-fluid w-100" :src="item.image" alt="..."
              /></a>
              <div class="product-overlay">
                <ul class="mb-0 list-inline">
                  <li class="list-inline-item m-0 p-0">
                    <a class="btn btn-sm btn-outline-dark" href="#!"
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
              <a class="reset-anchor" href="detail.html">{{ item.name }}</a>
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
import { ref, onMounted } from "vue";
export default {
  data() {
    return {
      categories: [],
      products: [],
    };
  },
  setup() {
    const cartItems = ref([]);

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

    // Function to add an item to the cart
    const addToCart = (item) => {
      const existingItem = cartItems.value.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        cartItems.value = cartItems.value.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If the item is not in the cart, add it with quantity 1
        cartItems.value = [...cartItems.value, { ...item, quantity: 1 }];
      }
      // Update localStorage with the updated cart items
      localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
      alert("Thêm vào giỏ hàng thành công")
    };

    // Function to remove an item from the cart
    const removeToCart = (item) => {
      const existingItem = cartItems.value.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If the item quantity is more than 1, decrease its quantity
          cartItems.value = cartItems.value.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        } else {
          // If the item quantity is 1, remove it from the cart
          cartItems.value = cartItems.value.filter(
            (cartItem) => cartItem.id !== item.id
          );
        }
        // Update localStorage with the updated cart items
        localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
        alert("Xóa khỏi giỏ hàng thành công")
      }
    };

    return {
      cartItems,
      addToCart,
      removeToCart,
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
  methods: {
    getCategories() {
      axios
        .get("http://localhost:3000/api/category/")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getProducts() {
      axios
        .get("http://localhost:3000/api/product")
        .then((response) => {
          this.products = response.data.data.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  created() {
    this.getCategories();
    this.getProducts();
  },
};
</script>
<style>
@import "src/assets/assetsshop/css/style.default.css";
</style>
