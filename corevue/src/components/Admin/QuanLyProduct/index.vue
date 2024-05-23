<template>
    <div class="row">
        <div class="col-12">
            <div class="card  shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card-header mt-2">
                    <div class="row">
                        <div class="col-6">
                            <h5>Quản Lý Sản Phẩm</h5>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-outline-primary float-end" data-bs-toggle="modal"
                                data-bs-target="#themmoimodal">Thêm mới</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="text-center align-middle">
                                    <th>#</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Thể Loại</th>
                                    <th>Hình Ảnh</th>
                                    <th>Mô tả</th>
                                    
                                    <th>Giá Bán</th>
                                    
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                <template v-for="(v,k) in list_san_pham">
                                    <tr class="align-middle">
                                        <th class=" text-nowrap text-center">{{ k+1 }}</th>
                                        <td class=" text-nowrap">{{ v.name }}</td>
                                        <td class=" text-nowrap">{{ v.catName }}</td>
                                        <td class=" text-center">
                                            <img v-bind:src="v.images" class="img-fluid" style="height: 100px; width: 100%;" alt="">
                                        </td>
                                        <td class=" text-nowrap">{{ v.description }}</td>
                                        
                                        <td class=" text-nowrap text-end">{{ v.price }}</td>
                                        
                                        <td class=" text-nowrap text-center">
                                            <button @:click=" update_san_pham = v" class="btn btn-primary me-2" data-bs-toggle="modal"
                                                data-bs-target="#capNhatmodal">Cập Nhật</button>
                                            <button @:click=" delete_san_pham = v" class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#xoaModal">Xóa</button>
                                        </td>
                                    </tr>
                                    
                                </template>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="themmoimodal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            
                            <div class="col-6 mb-2">
                                <label class="form-label">Tên Sản Phẩm</label>
                                <input v-model="create_san_pham.name" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Hình Ảnh</label>
                                <input v-model="create_san_pham.images" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Mô tả</label>
                                <input v-model="create_san_pham.description" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Giá Bán</label>
                                <input v-model="create_san_pham.price" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Thể Loại</label>
                            
                                <input v-model="create_san_pham.catName" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Close</button>
                        <button v-on:click="creSanPham()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="capNhatmodal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6 mb-2">
                                <label class="form-label">Tên Sản Phẩm</label>
                                <input v-model="update_san_pham.name" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Hình Ảnh</label>
                                <input v-model="update_san_pham.images" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Mô tả</label>
                                <input v-model="update_san_pham.description" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Giá Bán</label>
                                <input v-model="update_san_pham.price" type="text" class="form-control">
                            </div>
                            <div class="col-6 mb-2">
                                <label class="form-label">Thể Loại</label>
                                <!-- <select  class="form-select">
                                    <option value="0">Bể Cá</option>
                                </select> -->
                                <input v-model="update_san_pham.catName" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Close</button>
                        <button v-on:click="udaSanPham()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Xác
                            nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div
                            class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                            <div class="d-flex align-items-center">
                                <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                </div>
                                <div class="ms-3">
                                    <h6 class="mb-0 text-dark">Warning</h6>
                                    <div class="text-dark">
                                        <p>Bạn có muốn xóa sản phẩm <b>{{ delete_san_pham.name }}</b> này không?
                                        </p>
                                        <p>
                                            <b>Lưu ý:</b> Điều này không thể hoàn tác!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Close</button>
                        <button v-on:click="delSanPham()" type="button" class="btn btn-danger">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
  data() {
      return {
          list_san_pham: [],
          update_san_pham: {},
          create_san_pham: {},
          delete_san_pham: {},
          
      }
  },
  mounted() {
      this.loadSanPham();
  },
  methods: {
    loadSanPham() {
          axios
              .get('http://127.0.0.1:8000/api/admin/danh-muc/data')//chỉnh api lại hỉ
              .then((res) => {
                  this.list_san_pham = res.data.data;
                  toaster.success("Đã Load Sản Phẩm Thành Công");
              });
    },
    creSanPham(){
        //console.log(this.create_san_pham)
            axios
                
                .post('http://127.0.0.1:8000/api/admin/danh-muc/create',this.create_san_pham)
                .then((res) => {
                    
                        this.list_san_pham = res.data.data;
                        toaster.success("Đã Tạo mới Sản Phẩm Thành Công");
                        this.loadSanPham();
                });
        },
    udaSanPham(){
        axios
            .put('http://127.0.0.1:8000/api/admin/danh-muc/update',this.update_san_pham)
            .then((res) => {
                    this.list_san_pham = res.data.data;
                    toaster.success("Đã Cập Nhập Sản Phẩm Thành Công");
                    this.loadSanPham();
            });
    },
    delSanPham(){
        axios
            .post('http://127.0.0.1:8000/api/admin/danh-muc/delete', this.delete_san_pham)
            .then((res) => {
                toaster.success("Đã Xóa Sản Phẩm Thành Công");
                    this.loadSanPham();
            });
    }, 
      
  },
}
</script>
<style>
    
</style>