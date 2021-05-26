<template>
  <div class="main--container">
    <el-row>
      <el-col :span="5" class="aside">
        <SearchListLeft />
      </el-col>
      <el-col :span="12" :offset="6" class="main">
        <SearchListRight />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchListRight from "../SearchListRight";
import SearchListLeft from "../SearchListLeft";

export default {
  name: "SearchList",
  components: {
    SearchListRight,
    SearchListLeft,
  },
};
</script>
