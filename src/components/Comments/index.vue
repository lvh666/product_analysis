<template>
  <div>
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
      <div class="reply-info">
        <div
          tabindex="0"
          contenteditable="true"
          id="replyInput"
          spellcheck="false"
          placeholder="输入评论..."
          class="reply-input"
          @focus="showReplyBtn"
          @input="onDivInput($event)"
        ></div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button
          class="reply-btn"
          size="medium"
          @click="sendComment"
          type="primary"
          >发表评论</el-button
        >
      </div>
    </div>
    <div
      v-for="(item, i) in comments"
      :key="item.id"
      class="author-title reply-father"
    >
      <el-avatar
        class="header-img"
        :size="40"
        :src="item.userInfoDto.avatar"
      ></el-avatar>
      <div class="author-info">
        <span class="author-name">{{ item.userInfoDto.username }}</span>
        <span class="author-time">{{
          dateStr(new Date(item.createTime))
        }}</span>
      </div>
      <div class="icon-btn">
        <span
          @click="
            showReplyInput(i, item.userInfoDto.username, item.userInfoDto.id)
          "
        >
          <i class="iconfont el-icon-s-comment"></i>{{ item.replyCount }}
        </span>
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{ item.content }}</span>
        </p>
      </div>
      <div class="reply-box" v-if="item.replyCount">
        <div
          v-for="reply in item.replyComment"
          :key="reply.id"
          class="author-title"
        >
          <el-avatar
            class="header-img"
            :size="40"
            :src="reply.userInfoDto.avatar"
          ></el-avatar>
          <div class="author-info">
            <span class="author-name">{{ reply.userInfoDto.username }}</span>
            <span class="author-time">{{
              dateStr(new Date(reply.createTime))
            }}</span>
          </div>
          <div class="icon-btn">
            <span @click="showReplyInput(i, reply.from, reply.userInfoDto.id)"
              ><i class="iconfont el-icon-s-comment"></i
              >{{ reply.replyCount }}</span
            >
          </div>
          <div class="talk-box">
            <p>
              <span v-if="reply.replyInfoDto">
                回复 {{ reply.replyInfoDto.username }}:
              </span>
              <span class="reply">{{ reply.content }}</span>
            </p>
          </div>
          <div class="reply-box"></div>
        </div>
      </div>
      <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
        <div class="reply-info">
          <div
            tabindex="0"
            contenteditable="true"
            spellcheck="false"
            placeholder="输入评论..."
            @input="onDivInput($event)"
            class="reply-input reply-comment-input"
          ></div>
        </div>
        <div class="reply-btn-box">
          <el-button
            class="reply-btn"
            size="medium"
            @click="sendCommentReply(i, item.id)"
            type="primary"
          >
            发表评论
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getComments, postComment } from "@/api/comments";

const clickoutside = {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name: "ArticleComment",
  data() {
    return {
      btnShow: false,
      index: "0",
      replyComment: "",
      myName: "",
      myHeader: "",
      myId: 19870621,
      to: "",
      toId: -1,
      comments: [],
      replys: {},
    };
  },
  directives: { clickoutside },
  created() {
    const user = JSON.parse(localStorage.getItem("user")) || "";
    this.myName = user.username;
    this.myHeader = user.avatar;
    this.myId = user.id;
    this.listComments();
  },
  methods: {
    async listComments() {
      const comments = await getComments({
        curPage: 1,
        pageSize: 30,
        postId: this.$route.params.id,
      });
      this.comments = comments.data.records;
    },
    inputFocus() {},
    showReplyBtn() {
      this.btnShow = true;
    },
    hideReplyBtn() {
      this.btnShow = false;
    },
    showReplyInput(i, name, id) {
      this.showReplyBtn();
      this.comments[this.index].inputShow = false;
      this.index = i;
      this.comments[i].inputShow = true;
      this.to = name;
      this.toId = id;
    },
    _inputShow(i) {
      return this.comments[i].inputShow;
    },
    sendComment(e, from = null, to = null) {
      console.log(e);
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        const a = {
          userId: this.myId,
          content: this.replyComment,
          parentId: from,
          postId: this.$route.params.id,
          replyId: to,
        };
        postComment(a);
        this.listComments();
        this.replyComment = "";
        document.getElementById("replyInput").innerHTML = "";
      }
    },
    sendCommentReply(i, j) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        const a = {
          userId: this.myId,
          content: this.replyComment,
          parentId: j,
          postId: this.$route.params.id,
          replyId: this.toId,
        };
        postComment(a);
        this.listComments();
        this.replyComment = "";
        document.getElementsByClassName("reply-comment-input")[i].innerHTML =
          "";
      }
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML;
    },
    dateStr(date) {
      //获取js 时间戳
      let time = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000);
      //存储转换值
      let s;
      if (time < 60 * 10) {
        //十分钟内
        return "刚刚";
      } else if (time < 60 * 60 && time >= 60 * 10) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过30天ddd
        const date = new Date(parseInt(date));
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      }
    },
  },
};
</script>
<style scoped>
.my-reply {
  padding: 10px;
  background-color: #fafbfc;
}
.my-reply .header-img {
  display: inline-block;
  vertical-align: top;
}

.my-reply .reply-info {
  display: inline-block;
  margin-left: 5px;
  width: 90%;
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
}
.my-reply .reply-info .reply-input {
  min-height: 20px;
  line-height: 22px;
  padding: 10px 10px;
  color: #ccc;
  background-color: #fff;
  border-radius: 5px;
}
.my-reply .reply-info .reply-input:empty:before {
  content: attr(placeholder);
}

.my-reply .reply-info .reply-input:focus:before {
  content: none;
}

.my-reply .reply-info .reply-input:focus {
  padding: 8px 8px;
  border: 2px solid blue;
  box-shadow: none;
  outline: none;
}

.my-reply .reply-btn-box {
  height: 25px;
  margin: 10px 0;
}
.my-reply .reply-btn-box .reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}

.my-comment-reply {
  margin-left: 50px;
}
.my-comment-reply .reply-input {
  width: flex;
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  padding: 10px;
}
.author-title .header-img {
  display: inline-block;
  vertical-align: top;
}

.author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  height: 40px;
  line-height: 20px;
}
.author-title .author-info > span {
  display: block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.author-title .author-info .author-name {
  color: #000;
  font-size: 18px;
  font-weight: bold;
}

.author-title .author-info .author-time {
  font-size: 14px;
}

.author-title .icon-btn {
  width: 30%;
  padding: 0 !important;
  float: right;
  @media screen and (max-width: 1200px) {
    width: 20%;
    padding: 7px;
  }
}
.author-title .icon-btn > span {
  cursor: pointer;
}

.author-title .icon-btn .iconfont {
  margin: 0 5px;
}

.author-title .talk-box {
  margin: 0 50px;
}
.author-title .talk-box > p {
  margin: 0;
}

.author-title .talk-box .reply {
  font-size: 16px;
  color: #000;
}

.author-title .reply-box {
  margin: 10px 0 0 50px;
  background-color: #efefef;
}
</style>
