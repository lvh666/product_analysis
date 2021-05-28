<template>
  <div>
    <el-button type="primary" @click="showDrawer">添加</el-button>
    <ChangeDrawer @getSoftwares="getSoftware" />
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="name" label="软件" width="100"> </el-table-column>
      <el-table-column prop="desc" label="描述" width="180"> </el-table-column>
      <el-table-column
        prop="likeCount"
        label="好评"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="dislikeCount"
        label="差评"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="downloadLocation"
        label="下载地址"
        width="120"
      ></el-table-column>
      <el-table-column prop="shelfDate" label="软件时间" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            scope.row.shelfDate.slice(0, 10)
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
import { getSoftwares, delSoftware } from "@/api/software";
import ChangeDrawer from "../ChangeDrawer";

export default {
  name: "SoftwareManage",
  components: {
    ChangeDrawer,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      drawer: false,
      software: false,
    };
  },
  mounted() {
    this.getSoftware();
  },
  methods: {
    showDrawer() {
      this.$store.commit("changeDrawer", { software: true });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSoftware();
    },
    async getSoftware() {
      this.loading = true;
      const res = await getSoftwares({
        curPage: this.currentPage,
        pageSize: 10,
        status: 1,
      });
      this.total = res.data.total;
      this.tableData = res.data.records;
      this.loading = false;
    },
    handleEdit(index, row) {
      console.log(index);
      this.$store.commit("changeDrawer", { changeSoftware: true });
      this.$store.commit("getDrawerItem", { softwareItem: row });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delSoftware(row.id);
          if (res.msg === "success") {
            this.getSoftware();
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
