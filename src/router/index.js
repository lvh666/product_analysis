import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/SearchResult";
import Product from "@/pages/Product";
import User from "@/pages/User";
import ChangeSelfItem from "@/pages/User/components/ChangeSelfItem";
import ArticleManage from "@/pages/User/components/ArticleManage";
import SoftwareManage from "@/pages/User/components/SoftwareManage";
import TypeManage from "@/pages/User/components/TypesManage";

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
    {
      path: "/user/",
      name: "User",
      component: User,
      redirect: "/user/article",
      children: [
        {
          path: "/user/changeItem",
          name: "ChangeSelfItem",
          component: ChangeSelfItem,
        },
        {
          path: "/user/article",
          name: "ArticleManage",
          component: ArticleManage,
        },
        {
          path: "/user/software",
          name: "SoftwareManage",
          component: SoftwareManage,
        },
        {
          path: "/user/type",
          name: "TypeManage",
          component: TypeManage,
        },
      ],
    },
  ],
});
