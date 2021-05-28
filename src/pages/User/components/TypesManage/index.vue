<template>
  <div>
    <el-input
      type="text"
      placeholder="请输入内容"
      style="width: 220px"
      v-model="name"
      maxlength="10"
      show-word-limit
    >
    </el-input>
    <el-button style="margin-left: 10px" type="primary" @click="addTypeItem">
      添加
    </el-button>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            scope.row.createTime.slice(0, 10)
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTypes, addType } from "@/api/types";

export default {
  name: "TypesManage",
  data() {
    return {
      name: null,
      loading: false,
      tableData: [],
      currentPage: 1,
    };
  },
  mounted() {
    this.getType();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getArticle();
    },
    async addTypeItem() {
      if (!this.name) {
        this.$message({
          showClose: true,
          message: "请输入添加内容",
        });
      } else {
        const res = await addType(this.name);
        if (res.msg === "success") {
          this.getType();
          this.$message({
            message: "删除成功!",
            type: "success",
          });
        } else {
          this.$message.error("删除失败!");
        }
      }
    },
    async getType() {
      this.loading = true;
      const res = await getTypes({
        curPage: this.currentPage,
        pageSize: 15,
      });
      this.tableData = res.data.records;
      this.loading = false;
    },
    handleEdit(index, row) {
      console.log(index);
      this.$store.commit("changeDrawer", { changeDrawer: true });
      this.$store.commit("getDrawerItem", { articleItem: row });
    },
    /* handleDelete(index, row) {
      console.log(index);
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delArticle(row.id);
          if (res.msg === "success") {
            this.getArticle();
            this.$message({
              message: "删除成功!",
              type: "success",
            });
          } else {
            this.$message.error("删除失败!");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }, */
  },
};
</script>
