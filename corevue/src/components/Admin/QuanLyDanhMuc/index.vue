<template>
    <div class="col-12">
        <div class="card shadow-lg p-3 mb-5 bg-body rounded">
            <div class="card-header mt-2">
                <div class="row">
                    <div class="col-6">
                        <h5>Quản Lý Khách Hàng</h5>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#themmoimodal">Thêm mới</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <table class="table table-bordered mb-0">
                                    <thead>
                                        <tr class="text-center">
                                            <th>#</th>
                                            <th>Tên Danh Mục</th>
                                            <th>Hình Ảnh</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(v, k) in list_danh_muc" :key="v.id"> <!-- Sử dụng v.id nếu id là duy nhất -->
                                            <tr class="align-middle">
                                                <th class="text-center">{{ k + 1 }}</th>
                                                <td class="text-center">{{ v.catName }}</td>
                                                <td class="text-center">
                                                    <img :src="v.photo" class="img-fluid" style="height: 100px; width: 100%;" alt="">
                                                </td>
                                                <td class="text-center">
                                                    <button @click="update_danh_muc = v" class="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#capNhatKhachhangModal">Cập Nhật</button>
                                                    <button @click="delete_danh_muc = v" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#xoaKhachhangModal">Xóa</button>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="capNhatKhachhangModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Tên Danh Mục</label>
                        <input v-model="update_danh_muc.catName" type="text" class="form-control">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Hình Ảnh</label>
                        <input v-model="update_danh_muc.photo" type="text" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="udaDanhMuc()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="xoaKhachhangModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i></div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc chắn muốn xóa danh mục <b>{{ delete_danh_muc.catName }}</b> này không!</div>
                            </div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="delDanhMuc()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="themmoimodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thêm Mới</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6 mb-2">
                            <label class="form-label">Tên Danh Mục</label>
                            <input v-model="create_danh_muc.catName" type="text" class="form-control">
                        </div>
<div class="col-6 mb-2">
    <label class="form-label">Hình Ảnh</label>
    <input type="file" @change="handleFileUpload" class="form-control">
</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="creDanhMuc()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác nhận</button>
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
          list_danh_muc: [],
          update_danh_muc: {},
          create_danh_muc: {},
          delete_danh_muc: {},
          
      }
  },
  mounted() {
      this.loadDanhMuc();
  },
  methods: {
    handleFileUpload(event) {
        const file = event.target.files[0];
        this.image= file;
        console.log(this.image);
    },
    loadDanhMuc() {
          axios
              .get('http://localhost:3000/api/category')
              .then((res) => {
                  this.list_danh_muc = res.data;
                  toaster.success("Đã Load Danh Mục Thành Công");
              });
    },
creDanhMuc() {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('catName', this.create_danh_muc.catName); // Chú ý sửa lại 'create_san_pham.name' thành 'create_danh_muc.catName'
    formData.append('photo', this.image); // Đảm bảo 'this.image' là đường dẫn hoặc tệp hợp lệ

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    };

    axios.post('http://localhost:3000/api/category', formData, { headers })
        .then((res) => {
            this.list_danh_muc = res.data.data;
            console.log(this.list_danh_muc);

            toaster.success("Đã Tạo mới Danh Mục Thành Công");
            this.loadDanhMuc();
        })
        .catch((error) => {
            console.error("Error creating category:", error);
            toaster.error("Failed to create category. Please try again.");
        });
}

    // udaDanhMuc(){
    //     console.log(this.update_danh_muc)
    //     axios
            
    //         .put('http://127.0.0.1:8000/api/admin/danh-muc/update',this.update_danh_muc)
    //         .then((res) => {
    //                 this.list_danh_muc = res.data.data;
                    
    //                 toaster.success("Đã Cập nhập Danh Mục Thành Công");
    //                 this.loadDanhMuc();
    //         });
    // },
    // delDanhMuc(){
    //     console.log(this.delete_danh_muc)
    //     axios
            
    //         .post('http://127.0.0.1:8000/api/admin/danh-muc/delete', this.delete_danh_muc)
    //         .then((res) => {                   
    //                 toaster.success("Đã Xóa Danh Mục Thành Công");
    //                 this.loadDanhMuc();
    //         });
    // }, 
      
  },
}
</script>
<style></style>