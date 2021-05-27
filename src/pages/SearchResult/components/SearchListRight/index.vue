<template>
  <div class="search-content">
    <div class="sort-type">
      <a :class="{ active: isActive === 0 }" @click="changeClass(0)">
        综合排序
      </a>
      <a
        v-for="item in types"
        :key="item.id"
        :class="{ active: isActive === item.id }"
        @click="changeClass(item.id)"
      >
        · {{ item.name }}
      </a>
    </div>
    <div class="result">{{ total }} 个结果</div>
    <ul v-loading="loading">
      <li v-for="item in data" :key="item.id">
        <div>
          <div class="author">
            <a class="avatar">
              <el-avatar size="small" :src="item.user.avatar"></el-avatar>
            </a>
            <div class="info">
              <a class="nickname">{{ item.user.username }}</a>
              <span class="time">
                {{ dateFormat(new Date(item.createTime)) }}
              </span>
            </div>
          </div>
          <a :href="`#/product/${item.id}`" class="title">
            {{ item.name }}
          </a>
          <p class="abstract">{{ item.desc }}</p>
          <div class="meta">
            <a :href="`#/product/${item.id}`">{{ item.category.name }}</a>
            <span><i class="el-icon-success"></i> {{ item.likeCount }}</span>
            <a :href="`#/product/${item.id}`">
              <i class="el-icon-error"></i> {{ item.dislikeCount }}
            </a>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagination" v-if="data.length">
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
import { getSoftware } from "@/api/article";
import { getSoftwareTypes } from "@/api/software";

export default {
  name: "SearchListRight",
  data() {
    return {
      search: null,
      total: 0,
      data: [],
      types: [],
      isActive: 0,
      loading: true,
      currentPage: 1,
    };
  },
  mounted() {
    this.search = this.$route.params.value || "";
    this.getSoftwareItem();
    this.getTypes();
  },
  methods: {
    changeClass(index) {
      this.isActive = index;
      this.getSoftwareItem();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSoftwareItem();
    },
    async getSoftwareItem() {
      this.loading = true;
      const res = await getSoftware({
        curPage: this.currentPage,
        pageSize: 4,
        key: this.search,
        categoryId: this.isActive,
      });
      this.data = res.data.records;
      this.total = res.data.total;
      this.loading = false;
    },
    async getTypes() {
      const res = await getSoftwareTypes({
        curPage: 1,
        pageSize: 30,
        categoryId: 0,
      });
      this.types = res.data.records;
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
.search-content {
  position: relative;
  padding-left: 0;
}
.search-content ul {
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

.search-content .sort-type li,
.search-content > ul li {
  position: relative;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  word-wrap: break-word;
}

.jsd-meta {
  color: #ea6f5a !important;
}

.search-content .author {
  margin-bottom: 14px;
  font-size: 13px;
}

.search-content .author .avatar,
.search-content .author .info {
  display: inline-block;
  vertical-align: middle;
}

.search-content .author .avatar {
  margin: 0 5px 0 0;
}

.search-content .author .info .nickname {
  vertical-align: middle;
}

.search-content .author .info span {
  display: inline-block;
  padding-left: 3px;
  color: #969696;
  vertical-align: middle;
}

.search-content .title {
  margin: -7px 0 4px;
  display: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}

.search-content .abstract {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 24px;
  color: #999;
}

.search-content .meta {
  padding-right: 0 !important;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.search-content .meta a {
  margin-right: 10px;
  color: #b4b4b4;
}

.search-content .meta span {
  margin-right: 10px;
  color: #b4b4b4;
}

.sort-type {
  padding-bottom: 20px;
  font-size: 13px;
}

.sort-type a,
.sort-type span {
  color: #969696;
}

a,
body {
  color: #333;
}

.sort-type a.active,
a :visited,
.sort-type a:hover {
  color: #2f2f2f;
}

.sort-type a,
.sort-type span {
  color: #969696;
}

.sort-type .v-select-wrap {
  display: inline-block;
  vertical-align: middle;
  color: #969696;
}

.v-select-wrap {
  position: relative;
}

.v-select-wrap .v-select-submit-wrap {
  float: right;
  height: 100%;
  cursor: pointer;
}

.sort-type .v-select-wrap svg {
  width: 8px;
  height: 12px;
  fill: #969696;
}

.v-select-wrap .v-select-submit-wrap.open svg {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.v-select-wrap .v-select-text-area-wrap {
  height: 100%;
  overflow: hidden;
}

.v-select-wrap .v-select-text-area-wrap .v-select-input-wrap {
  height: 100%;
  overflow: hidden;
}

.sort-type .v-select-wrap li {
  padding: 0;
  list-style-type: none;
}

.sort-type .v-select-wrap .v-select-options-wrap {
  background-color: #fff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0 0 4px 4px;
  width: 80px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.sort-type .v-select-wrap .v-select-options-wrap .v-select-options-item {
  height: 30px;
  line-height: 30px;
  padding-left: 13px;
}

.sort-type
  .v-select-wrap
  .v-select-options-wrap
  .v-select-options-item.selected {
  background-color: #f0f0f0;
}

.sort-type .v-select-wrap li {
  padding: 0;
  list-style-type: none;
}

.result {
  position: absolute;
  top: 0;
  right: 15px;
  font-size: 13px;
  color: #b4b4b4;
}

.pagination {
  margin: 20px 0;
  display: block;
  text-align: center;
}
</style>
