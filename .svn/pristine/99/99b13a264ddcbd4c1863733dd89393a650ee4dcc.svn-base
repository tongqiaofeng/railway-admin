import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      type: 'login',
      allowBack: false
    }
  },
  {
    path: "/file",
    name: "File",
    component: () => import("../views/File-read.vue")
  },
  {
    path: "/img/:id/:jobNumber",
    name: "Img",
    component: () => import("../views/Img-con.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;