import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/admin',
        component: ()=>import('../layout/wrapper/index.vue'),
    },
    {
        path : '/a',
        component: ()=>import('../components/index.vue'),
        meta : {layout : 'customer'}
    },
    {
        path : '/',
        component: ()=>import('../components/Customer/HomePage/index.vue'),
        meta : {layout : 'customer'}
    },
    {
        path: '/shop/:catName',
        name: 'ShopCategory',
        component: ()=>import('../components/Customer/Shop/index.vue'),
        meta : {layout : 'customer'},
        props: true
    },
    {
        path: '/shop',
        component: ()=>import('../components/Customer/Shop/index.vue'),
        meta : {layout : 'customer'}
    },
    {
        path : '/detail',
        component: ()=>import('../components/Customer/ProductDetail/index.vue'),
        meta : {layout : 'customer'}
    },
    {
        path : '/cart',
        component: ()=>import('../components/Customer/Cart/index.vue'),
        meta : {layout : 'customer'}
    },
    {
        path : '/checkout',
        component: ()=>import('../components/Customer/CheckOut/index.vue'),
        meta : {layout : 'customer'}
    },
    {
        path : '/loginadmin',
        component: ()=>import('../components/Admin/DangNhapAdmin/index.vue'),
        meta : {layout : 'dang'}
    },
    {
        path : '/logincustomer',
        component: ()=>import('../components/Customer/DangNhapCustomer/index.vue'),
        meta : {layout : 'dang'}
    },
    {
        path : '/logoutadmin',
        component: ()=>import('../components/Admin/DangKyAdmin/index.vue'),
        meta : {layout : 'dang'}
    },
    {
        path : '/logoutcustomer',
        component: ()=>import('../components/Customer/DanhKyCustomer/index.vue'),
        meta : {layout : 'dang'}
    },
    {
        path : '/QLDanhMuc',
        component: ()=>import('../components/Admin/QuanLyDanhMuc/index.vue'),
        
    },
    {
        path : '/QLProduct',
        component: ()=>import('../components/Admin/QuanLyProduct/index.vue'),
        
    },
    {
        path : '/Dashboard',
        component: ()=>import('../components/Admin/Dashbord/index.vue'),
        
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router