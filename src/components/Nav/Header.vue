<template>
  <div class="m-header">
    <div class="m-header-box">
      <router-link to="/" class="btn">软件产品</router-link>
      <div class="recommend-header">
        <router-link to="/" class="type-recommend">首页</router-link>
      </div>
      <div class="right-header">
        <div class="box-header user-header">
          <a @click="toManage('MyInfo')" v-if="user != null">
            <img class="i-box-header i-user" :src="user.avatar" />
          </a>
          <a @click="toLogin()" v-else>
            <img class="i-box-header i-user" src="../../assets/user.png" />
          </a>
          <a @click="toManage('MyInfo')" v-if="user.nickName != null">
            <div class="span-box-header name-user show">
              {{ user.name }}
            </div>
          </a>
          <div class="login-user show" v-else>
            <span
              @click="toLogin()"
              class="span-box-header span-user"
              v-if="!user"
              >登录</span
            >
            <span @click="exit()" class="span-box-header span-user" v-else
              >退出登录</span
            >
          </div>
        </div>
      </div>
      <div class="search-header">
        <img class="i-search" src="../../assets/search.png" alt="搜索" />
        <input class="input-search" v-model="search" placeholder="搜索" />
        <div class="btn-search" @click="searchItem">搜索</div>
        <div class="list-search-wrap">
          <div class="list-search"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/mainHeader.css";
export default {
  name: "Header",
  data() {
    return {
      user: {},
      search: "",
    };
  },
  mounted() {
    this.search = this.$route.params.value || "";
    this.user = JSON.parse(localStorage.getItem("user")) || "";
  },
  methods: {
    exit() {
      this.user = {};
      this.toLogin();
    },
    toLogin() {
      this.$router.push({
        path: `/Login`,
      });
    },
    searchItem() {
      const arr = JSON.parse(localStorage.getItem("search-history")) || [];
      const index = arr.indexOf(this.search);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      arr.unshift(this.search);

      localStorage.setItem("search-history", JSON.stringify(arr));
      if (this.search) {
        if (this.$route.path.slice(0, 7) === "/search") {
          this.$router.push({
            path: `/search/${this.search}`,
          });
          this.$router.go(0);
        } else {
          this.$router.push({
            path: `/search/${this.search}`,
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "搜索框不能为空",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.btn {
  float: left;
  margin-top: 12px;
  width: 121px;
  height: 46px;
  line-height: 46px;
  overflow: hidden;
  text-align: center;
  border: 1px solid #ebebeb;
  font-size: 14px;
  color: #888;
  text-decoration: none;
  cursor: pointer;
}
</style>
