<template>
  <div>
    <el-button type="primary" @click="showDrawer">添加</el-button>
    <ChangeDrawer @getArticle="getArticle" />
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="title" label="标题" width="100"> </el-table-column>
      <el-table-column prop="content" label="内容" width="180">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="类别"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="softwareName"
        label="软件名称"
        width="80"
      ></el-table-column>

      <el-table-column
        prop="userInfoDto.username"
        label="作者"
        width="80"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            scope.row.createTime.slice(0, 10)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="total">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticles, delArticle } from "@/api/article";
import ChangeDrawer from "../ChangeDrawer";

export default {
  name: "ArticleManage",
  components: {
    ChangeDrawer,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getArticle();
    },
    showDrawer() {
      this.$store.commit("changeDrawer", { drawer: true });
    },
    async getArticle() {
      this.loading = true;
      const res = await getArticles({
        curPage: this.currentPage,
        pageSize: 10,
        uid: JSON.parse(localStorage.getItem("user"))?.id,
      });
      this.total = res.data.total;
      this.tableData = res.data.records;
      this.loading = false;
    },
    handleEdit(index, row) {
      console.log(index);
      this.$store.commit("changeDrawer", { changeDrawer: true });
      this.$store.commit("getDrawerItem", { articleItem: row });
    },
    handleDelete(index, row) {
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
    },
  },
};
</script>
