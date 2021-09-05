<template>
  <el-card class="comment-list" style="margin-top: 10px" v-if="user">
    <Comments />
  </el-card>
</template>

<script>
import Comments from "@/components/Comments";

export default {
  name: "Comment",
  components: {
    Comments,
  },
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
