import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/Wrapper/index.vue'
import Customer from './layout/wrapper/Customer.vue'
import dangnhap from './layout/wrapper/dangnhap.vue'
const app = createApp(App)
import store from './store';

app.use(router)
app.component("default-layout", Default);
app.component("customer-layout", Customer);
app.component("dang-layout", dangnhap);
app.use(store);
app.mount("#app")
