<template>
  <div class="inputResult">
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
  mounted() {
    this.search = this.$route.params.value || "";
  },
  methods: {
    searchItem() {
      if (!this.search) {
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
.inputResult {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 45%;
}
</style>
