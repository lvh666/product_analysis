<template>
  <el-card style="width: 80%; margin: 0 auto; margin-top: 10px">
    <ul class="article-list">
      <div v-if="item">
        <h1 class="title">{{ item.title }}</h1>
        <div class="rEsl9f">
          <div class="_2mYfmT">
            <a class="avatar">
              <el-avatar :src="item.userInfoDto.avatar"></el-avatar>
            </a>
            <div style="margin-left: 8px">
              <div class="_3U4Smb">
                <span class="FxYr8x">{{ item.userInfoDto.username }}</span>
              </div>
              <div class="s-dsoj">
                <span>{{ item.categoryName }}</span>
                <span>{{ item.softwareName }}</span>
                <span>{{ dateFormat(new Date(item.createTime)) }}</span>
              </div>
            </div>
          </div>
        </div>
        <el-rate
          style="margin-top: 10px"
          v-model="item.score"
          disabled
          show-text
          text-color="#ff9900"
        />
        <div
          v-html="item.content"
          style="margin-top: 20px; margin-bottom: 10px"
        ></div>
      </div>
    </ul>
  </el-card>
</template>

<script>
import { getArticle } from "@/api/article";

export default {
  name: "ArticleContent",
  data() {
    return {
      item: null,
    };
  },
  created() {
    this.getArticleItem();
  },
  methods: {
    async getArticleItem() {
      const res = await getArticle(this.$route.params.id);
      this.item = res.data;
    },
    dateFormat(date) {
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
  },
};
</script>

<style>
.article-list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}

p {
  margin: 0 0 10px;
}

.jsd-meta {
  color: #ea6f5a !important;
}

.article-list .title {
  font-size: 30px;
  font-weight: 700;
  word-break: break-word;
}

.article-list .abstract {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 24px;
  color: #999;
}

.article-list .meta {
  padding-right: 0 !important;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.article-list .meta a {
  margin-right: 10px;
  color: #b4b4b4;
}

.article-list .meta span {
  margin-right: 10px;
  color: #b4b4b4;
}

._2mYfmT {
  display: flex;
  align-items: center;
}

._3U4Smb {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.s-dsoj {
  display: flex;
  color: #969696;
}

.s-dsoj > :not(:last-child) {
  margin-right: 10px;
}
</style>
