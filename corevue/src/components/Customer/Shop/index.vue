<template>
  <div class="container">
    <!-- HERO SECTION-->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
          <div class="col-lg-6">
            <h1 class="h2 text-uppercase mb-0">Shop</h1>
          </div>
          <div class="col-lg-6 text-lg-end">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                <li class="breadcrumb-item">
                  <a class="text-dark" href="index.html">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <a class="text-dark" href="/shop">Shop</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5">
      <div class="container p-0">
        <div class="row">
          <!-- SHOP SIDEBAR-->
          <div class="col-lg-3 order-2 order-lg-1">
            <h5 class="text-uppercase mb-4">Categories</h5>
            <div class="py-2 px-4 bg-dark text-white mb-3">
              <strong class="small text-uppercase fw-bold"
                >Fashion &amp; Acc</strong
              >
            </div>
            <ul
              class="list-unstyled small text-muted ps-lg-4 font-weight-normal"
            >
              <li class="mb-2" v-for="item in mappedCategories" :key="item.id">
                <a class="reset-anchor" :href="'/shop/' + item.catName">{{
                  item.catName
                }}</a>
              </li>
            </ul>
          </div>
          <!-- SHOP LISTING-->
          <div class="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
            <div class="row mb-3 align-items-center">
              <div class="col-lg-6 mb-2 mb-lg-0">
                <p class="text-sm text-muted mb-0">
                  Showing 1–12 of 53 results
                </p>
              </div>
              <div class="col-lg-6">
                <ul
                  class="list-inline d-flex align-items-center justify-content-lg-end mb-0"
                >
                  <li class="list-inline-item text-muted me-3">
                    <a class="reset-anchor p-0" href="#!"
                      ><i class="fas fa-th-large"></i
                    ></a>
                  </li>
                  <li class="list-inline-item text-muted me-3">
                    <a class="reset-anchor p-0" href="#!"
                      ><i class="fas fa-th"></i
                    ></a>
                  </li>
                  <!-- <li class="list-inline-item">
                        <select class="selectpicker" data-customclass="form-control form-control-sm">
                          <option value>Sort By </option>
                          <option value="default">Default sorting </option>
                          <option value="popularity">Popularity </option>
                          <option value="low-high">Price: Low to High </option>
                          <option value="high-low">Price: High to Low </option>
                        </select>
                      </li> -->
                </ul>
              </div>
            </div>
            <div class="row">
              <!-- PRODUCT-->
              <div
                class="col-lg-4 col-sm-6"
                v-for="item in mappedProducts"
                :key="item.id"
              >
                <div class="product text-center">
                  <div class="mb-3 position-relative">
                    <div class="badge text-white bg-"></div>
                    <a class="d-block" href="detail.html"
                      ><img class="img-fluid w-100" :src="item.image" alt="..."
                    /></a>
                    <div class="product-overlay">
                      <ul class="mb-0 list-inline">
                        <li class="list-inline-item m-0 p-0">
                          <a class="btn btn-sm btn-outline-dark" href="#!"
                            ><i class="far fa-heart"></i
                          ></a>
                        </li>
                        <li
                          class="list-inline-item m-0 p-0"
                          @click="addToCart(item)"
                        >
                          <a class="btn btn-sm btn-dark" href="#!"
                            >Add to cart</a
                          >
                        </li>
                        <li class="list-inline-item mr-0">
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
                    <a class="reset-anchor" href="detail.html">{{
                      item.name
                    }}</a>
                  </h6>
                  <p class="small text-muted">{{ item.price }}</p>
                </div>
              </div>
            </div>
            <!-- PAGINATION-->
            <nav aria-label="Page navigation example">
              <ul
                class="pagination justify-content-center justify-content-lg-end"
              >
                <li class="page-item mx-1">
                  <a class="page-link" href="#!" aria-label="Previous"
                    ><span aria-hidden="true">«</span></a
                  >
                </li>
                <li class="page-item mx-1 active">
                  <a class="page-link" href="#!">1</a>
                </li>
                <li class="page-item mx-1">
                  <a class="page-link" href="#!">2</a>
                </li>
                <li class="page-item mx-1">
                  <a class="page-link" href="#!">3</a>
                </li>
                <li class="page-item ms-1">
                  <a class="page-link" href="#!" aria-label="Next"
                    ><span aria-hidden="true">»</span></a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: ["catName"],
  data() {
    return {
      categories: [],
      products: [],
    };
  },
  computed: {
    mappedCategories() {
      return this.categories.map((category) => {
        return {
          id: category.id,
          catName: category.catName,
          photo: category.photo,
        };
      });
    },
    mappedProducts() {
      return this.products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        };
      });
    },
  },
  methods: {
    ...mapActions(["addToCart"]),
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
    getProductsByCategory(cate) {
      axios
        .get(
          `http://localhost:3000/api/product/cat/?catName=${cate}&limit=10&page=1`
        )
        .then((response) => {
          this.products = response.data.data.data;
          console.log(this.products);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  created() {
    this.getCategories();
    if (!this.catName) {
      this.getProducts();
    } else {
      this.getProductsByCategory(this.catName);
    }
  },
};
</script>
<style>
@import "src/assets/assetsshop/css/style.default.css";
</style>
