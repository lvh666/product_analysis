<template>
  <div>
    <Header />
    <el-container style="border: 1px solid #eee; margin: 15px 7% 0 7%">
      <el-aside width="200px">
        <UserMenu />
      </el-aside>
      <el-container
        ><router-view style="margin: 0 auto; margin-top: 2%"
      /></el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Nav/Header";
import UserMenu from "./components/UserMenu";

export default {
  name: "User",
  components: {
    Header,
    UserMenu,
  },
  data() {
    return {
      search: "",
    };
  },
  mounted() {
    this.search = this.$route.query.value || "";
  },
};
</script>
