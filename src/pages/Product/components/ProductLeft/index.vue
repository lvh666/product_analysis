<template>
  <el-card class="product-card" v-if="data.length">
    <ul class="note-list">
      <li v-for="item in data" :key="item.id">
        <div>
          <div class="author">
            <a class="avatar">
              <el-avatar
                size="small"
                :src="item.userInfoDto.avatar"
              ></el-avatar>
            </a>
            <div class="info">
              <a class="nickname">{{ item.userInfoDto.username }}</a>
              <span class="time">
                {{ dateFormat(new Date(item.createTime)) }}
              </span>
            </div>
          </div>
          <a :href="`#/article/${item.id}`" class="title">{{ item.title }}</a>
          <p class="abstract">{{ item.content }}</p>
          <span><el-rate v-model="item.score" show-text disabled /></span>
          <div class="meta">
            <a :href="`#/article/${item.id}`">{{ item.categoryName }}</a>
            <a :href="`#/article/${item.id}`">{{ item.softwareName }}</a>
          </div>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<script>
import { getArticlesBySid } from "@/api/article";

export default {
  name: "Producteft",
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  created() {
    this.getSoftwareItem();
  },
  methods: {
    async getSoftwareItem() {
      this.loading = true;
      const res = await getArticlesBySid({
        curPage: 1,
        pageSize: 10,
        sid: this.$route.params.id,
      });
      this.data = res.data.records;
      this.loading = false;
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
.product-list {
  width: 80%;
  margin: 0 auto;
}
.product-card {
  margin-top: 10px;
}
.v-card {
  height: 110px;
  border-bottom: 1px solid black;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 75%;
}

.note-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  line-height: 20px;
}

p {
  margin: 0 0 10px;
}

.note-list li {
  position: relative;
  width: 100%;
  margin: 0 0 10px;
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  word-wrap: break-word;
}

.jsd-meta {
  color: #ea6f5a !important;
}

.note-list .title {
  margin: -7px 0 4px;
  display: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}

.note-list .abstract {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 24px;
  color: #999;
}

.note-list .meta {
  padding-right: 0 !important;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.note-list .meta a {
  margin-right: 10px;
  color: #b4b4b4;
}

.note-list .meta span {
  margin-right: 10px;
  color: #b4b4b4;
}

.note-list .author {
  margin-bottom: 10px;
  font-size: 13px;
}

.note-list .author .avatar,
.note-list .author .info {
  display: inline-block;
  vertical-align: middle;
}

.note-list .author .avatar {
  margin: 0 5px 0 0;
}

.note-list .author .info .nickname {
  vertical-align: middle;
}

.note-list .author .info span {
  display: inline-block;
  padding-left: 3px;
  color: #969696;
  vertical-align: middle;
}

.note-list .title {
  margin: -7px 0 4px;
  display: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}

.note-list .abstract {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 24px;
  color: #999;
}
</style>
