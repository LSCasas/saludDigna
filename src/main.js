import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./style.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Toast);

app.mount("#app");
