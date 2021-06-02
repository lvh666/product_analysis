<template>
  <el-card class="comment-list" style="margin-top: 30px">
    <div class="comment-title">评论</div>
    <div class="comment-words">
      <el-row
        type="flex"
        class="row-bg"
        style="margin-top: 10px"
        justify="center"
        v-if="total === 0"
      >
        <el-col :span="20">
          <div style="float: left">
            <span style="margin-top: 50px">暂无评论</span>
          </div>
        </el-col>
      </el-row>

      <el-row
        type="flex"
        class="row-bg"
        style="margin-top: 10px"
        justify="center"
        v-for="item in comments"
        :key="item.id"
      >
        <el-col :span="20">
          <el-card shadow="never">
            <div class="demo-basic--circle" style="width: 30px; float: left">
              <div class="block">
                <el-avatar size="small" :src="item.user.avatar">{{
                  item.user.nickName
                }}</el-avatar>
              </div>
            </div>
            <div style="float: left" v-if="item.content">
              <span style="font-size: 12px; color: green; fontweight: bold"
                >{{ item.user.nickName }} -
                {{ new Date(item.createTime).toLocaleString() }}</span
              >
              <br />
              <div style="margin-top: 10px"></div>
              <span v-html="item.content.replace(/\n/g, '<br>')"></span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        class="row-bg"
        style="margin-top: 10px"
        v-if="total !== 0"
      >
        <el-col :span="22">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :page-size="30"
            style="float: right"
            :total="total"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        class="row-bg"
        style="margin-top: 10px"
        justify="center"
        v-if="user"
      >
        <el-col :span="20">
          <el-card shadow="never">
            <div>
              <div class="form-group">
                <label>评论内容</label>
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="content"
                ></el-input>
              </div>
              <div>
                <el-button
                  style="float: right"
                  type="success"
                  @click="postComments"
                  plain
                  >发表评论</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      user: {},
      comments: [],
      total: 0,
      status: 0,
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")) || "";
  },
  methods: {
    handleCurrentChange(val) {
      this.nowPage = val;
      this.getComments();
    },
    postComments() {
      if (this.content !== "") {
        let time = new Date().getTime();
        let item = {
          content: this.content,
          createTime: time,
          performId: this.$store.state.id,
          userId: this.$store.state.user.id,
        };
        this.$api.post(
          "comment/add",
          item,
          (res) => {
            if (res.data.msg === "新增成功") {
              this.$message({
                type: "success",
                message: "评论成功!",
              });
              this.getComments();
              this.content = "";
            } else {
              this.$message.error(res.data.msg);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.$message.error("请输入评论内容");
      }
    },
  },
};
</script>

<style>
.comment-list {
  padding-top: 10px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.comment-title {
  padding-bottom: 14px;
  margin-bottom: 23px;
  font-size: 20px;
  color: #000;
  border-bottom: 1px solid #e2e2e2;
}
.comment-words {
  word-break: break-word;
}
.comment-words p {
  font-size: 16px;
  color: #4a4a4a;
  line-height: 30px;
}
.comment-words .item_title {
  color: #999;
  font-size: 13px;
}
li,
ul {
  list-style: none;
}
.comment-words li {
  line-height: 26px;
  padding-bottom: 15px;
  font-size: 16px;
  color: #4a4a4a;
}
.comment-times {
  width: 130px;
}
.sku_item {
  width: 120px;
}
</style>
