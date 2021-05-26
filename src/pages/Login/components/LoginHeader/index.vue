<template>
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="4">
      <router-link to="/" class="btn">软件产品</router-link>
    </el-col>
    <el-col :span="1"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
  </el-row>
</template>

<script>
export default {
  name: "LoginHeader",
};
</script>

<style scoped>
.left {
  float: left;
  margin-top: 24px;
  width: 108px;
  height: 48px;
}
.btn {
  float: left;
  margin-top: 24px;
  margin-bottom: 24px;
  width: 121px;
  height: 38px;
  line-height: 38px;
  overflow: hidden;
  text-align: center;
  border: 1px solid #ebebeb;
  font-size: 14px;
  color: #888;
  text-decoration: none;
  cursor: pointer;
}
</style>
