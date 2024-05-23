<template>
  <section class="py-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-6">
          <!-- PRODUCT SLIDER-->
          <div class="row m-sm-0">
            <div class="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0 px-xl-2">
              <div class="swiper product-slider-thumbs">
                <div class="swiper-wrapper">
                  <div class="swiper-slide h-auto swiper-thumb-item mb-3">
                    <img class="w-100" :src="product.images" alt="...">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-10 order-1 order-sm-2">
              <div class="swiper product-slider">
                <div class="swiper-wrapper">
                  <div class="swiper-slide h-auto">
                    <a class="glightbox product-view" data-gallery="gallery2" data-glightbox="Product item 1">
                      <img class="img-fluid" :src="product.images" alt="...">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PRODUCT DETAILS-->
        <div class="col-lg-6">
          <ul class="list-inline mb-2 text-sm">
            <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 1"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 2"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 3"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 4"><i class="fas fa-star small text-warning"></i></li>
          </ul>
          <h1>{{ product.name }}</h1>
          <p class="text-muted lead">${{ product.price }}</p>
          <p class="text-sm mb-4">{{ product.description }}</p>
          <div class="row align-items-stretch mb-4">
            <div class="col-sm-5 pr-sm-0">
              <div class="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                <span class="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                <div class="quantity">
                  <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                  <input class="form-control border-0 shadow-0 p-0" type="text" value="1">
                  <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                </div>
              </div>
            </div>
            <div class="col-sm-3 pl-sm-0">
              <a class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0" @click="addToCart(product)">Add to cart</a>
            </div>
          </div>
          <a class="text-dark p-0 mb-4 d-inline-block" href="#!">
            <i class="far fa-heart me-2"></i>Add to wish list
          </a><br>
          <ul class="list-unstyled small d-inline-block">
            <li class="px-3 py-2 mb-1 bg-white">
              <strong class="text-uppercase">SKU:</strong>
              <span class="ms-2 text-muted">{{ product.sku }}</span>
            </li>
            <li class="px-3 py-2 mb-1 bg-white text-muted">
              <strong class="text-uppercase text-dark">Category:</strong>
              <a class="reset-anchor ms-2" href="#!">{{ product.category?.catName }}</a>
            </li>
            <li class="px-3 py-2 mb-1 bg-white text-muted">
              <strong class="text-uppercase text-dark">Tags:</strong>
              <a class="reset-anchor ms-2" href="#!">{{ product.tags }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- DETAILS TABS-->
      <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
        </li>
      </ul>
      <div class="tab-content mb-5" id="myTabContent">
        <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
          <div class="p-4 p-lg-5 bg-white">
            <h6 class="text-uppercase">Product description </h6>
            <p class="text-muted text-sm mb-0">{{ product.description }}</p>
          </div>
        </div>
      </div>
      <!-- RELATED PRODUCTS-->
      <h2 class="h5 text-uppercase mb-4">Related products</h2>
      <div class="row">
        <!-- PRODUCT-->
        <div class="col-lg-3 col-sm-6" v-for="relatedProduct in relatedProducts" :key="relatedProduct.id">
          <div class="product text-center skel-loader">
            <div class="d-block mb-3 position-relative">
              <a class="d-block" :href="`/detail/${relatedProduct.id}`">
                <img class="img-fluid w-100" :src="relatedProduct.image" alt="...">
              </a>
              <div class="product-overlay">
                <ul class="mb-0 list-inline">
                  <li class="list-inline-item m-0 p-0">
                    <a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a>
                  </li>
                  <li class="list-inline-item m-0 p-0">
                    <a class="btn btn-sm btn-dark" @click="addToCart(relatedProduct)">Add to cart</a>
                  </li>
                  <li class="list-inline-item mr-0">
                    <a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal">
                      <i class="fas fa-expand"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <h6>
              <a class="reset-anchor" :href="`/detail/${relatedProduct.id}`">{{ relatedProduct.name }}</a>
            </h6>
            <p class="small text-muted">${{ relatedProduct.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import {useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    const products = ref([]);
    const cartItems = ref([]);
    const categories = ref([]);
    const product = ref({});
    const relatedProducts = ref([]);

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
      getProducts();
      getProduct(props.id);
    });

    const getCategories = () => {
      axios
        .get("http://localhost:3000/api/category/")
        .then((response) => {
          categories.value = response.data;
        })
        .catch((e) => {
          console.error(e);
        });
    };

    const getProducts = () => {
      axios
        .get("http://localhost:3000/api/product")
        .then((response) => {
          products.value = response.data.data.data;
        })
        .catch((e) => {
          console.error(e);
        });
    };

const getProduct = (id) => {
  axios
    .get(`http://localhost:3000/api/product/${id}`)
    .then((response) => {
      product.value = response.data.data;
      console.log(product.value);
      
      // Map product array elements to relatedProducts
      relatedProducts.value = products.value.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.images[0],
      }));
    })
    .catch((e) => {
      console.error(e);
    });
};


    return {
      categories,
      products,
      product,
      relatedProducts,
      addToCart,
      removeFromCart,
      vuexCartItems,
      cartItemCount,
      cartTotal,
    };
  },
};
</script>
<style >
@import 'src/assets/assetsshop/css/style.default.css';
</style>
