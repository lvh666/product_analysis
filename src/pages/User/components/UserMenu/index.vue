<template>
  <div>
    <el-menu :default-active="path" router class="el-menu-vertical-demo">
      <el-menu-item index="article">
        <i class="el-icon-tickets"></i>
        <span slot="title">帖子管理</span>
      </el-menu-item>
      <el-menu-item index="software">
        <i class="el-icon-monitor"></i>
        <span slot="title">软件管理</span>
      </el-menu-item>
      <el-menu-item v-if="user.role == 1" index="type">
        <i class="el-icon-price-tag"></i>
        <span slot="title">软件类别管理</span>
      </el-menu-item>
      <el-submenu v-if="user.role == 1" index="5">
        <template slot="title">
          <i class="el-icon-time"></i>
          <span>审核</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="review">软件审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  data() {
    return {
      path: "",
      user: {},
    };
  },
  mounted() {
    this.path = this.$route.path.split("/")[2];
    this.user = JSON.parse(localStorage.getItem("user")) || "";
    console.log(this.user);
  },
};
</script>
