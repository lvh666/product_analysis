import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/SearchResult";
import Product from "@/pages/Product";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/search/:value",
      name: "Search",
      component: Search,
    },
    {
      path: "/product/:id",
      name: "Product",
      component: Product,
    },
  ],
});
