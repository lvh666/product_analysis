<template>
  <div class="main--container">
    <el-row>
      <el-col class="main">
        <HomeLeft />
      </el-col>
      <!--  <el-col :span="7" :offset="1" class="main--aside">
        <HomeRight />
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import HomeLeft from "../HomeLeft";
// import HomeRight from "../HomeRight";

export default {
  name: "HomeContent",
  components: {
    HomeLeft,
    // HomeRight,
  },
};
</script>

<style>
.main--container {
  margin-right: auto;
  margin-left: 10%;
  margin-right: 10%;
  padding-left: 15px;
  padding-right: 15px;
}

.main--container .main {
  padding-top: 30px;
  padding-right: 0;
}

.main--container .main--aside {
  padding: 30px 0 0;
}
</style>
