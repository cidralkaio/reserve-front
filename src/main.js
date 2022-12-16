import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import cookies from "vue-cookies";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(cookies);

app.mount("#app");
