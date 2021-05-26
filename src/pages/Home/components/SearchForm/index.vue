<template>
  <div class="inputFix">
    <el-input
      placeholder="请输入内容"
      v-model="search"
      class="input-with-select"
    >
      <el-button
        @click="searchItem()"
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchItem() {
      if (this.search) {
        this.$router.push({
          path: `/search`,
          query: {
            value: this.search,
          },
        });
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
<style>
.inputFix {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45%;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
