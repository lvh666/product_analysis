<template>
  <div>
    <el-radio-group v-model="status" size="small" @change="getSoftware">
      <el-radio-button :label="0">待审核</el-radio-button>
      <el-radio-button :label="1">通过</el-radio-button>
      <el-radio-button :label="2">未通过</el-radio-button>
    </el-radio-group>
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
      <el-table-column prop="downloadLocation" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="typeColors[scope.row.status]" disable-transitions>{{
            type[scope.row.status]
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-if="!status">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleReview(scope.$index, scope.row, 1)"
            >通过</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleReview(scope.$index, scope.row, 2)"
            >不通过</el-button
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
import { getReviewList, reviewSoftware } from "@/api/software";

export default {
  name: "ReviewManage",
  data() {
    return {
      loading: false,
      tableData: [],
      type: { 0: "待审核", 1: "通过", 2: "未通过" },
      typeColors: { 0: "info", 1: "success", 2: "danger" },
      total: 0,
      currentPage: 1,
      drawer: false,
      software: false,
      status: 0,
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
      const res = await getReviewList({
        curPage: this.currentPage,
        pageSize: 10,
        status: this.status,
      });
      this.total = res.data.total;
      this.tableData = res.data.records;
      this.loading = false;
    },
    async handleReview(index, row, status) {
      console.log(index);
      const res = await reviewSoftware(row.id, status);
      if (res.msg === "success") {
        this.getSoftware();
        this.$message({
          message: "审核成功!",
          type: "success",
        });
      } else {
        this.$message.error("审核失败!");
      }
    },
  },
};
</script>
