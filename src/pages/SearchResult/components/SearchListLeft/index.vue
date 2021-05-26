<template>
  <div class="aside">
    <div>
      <ul class="menu">
        <li class="active">
          <a>
            <div class="setting-icon">
              <i class="el-icon-tickets"></i>
            </div>
            <span>文章</span></a
          >
        </li>
      </ul>
    </div>
    <div class="search-recent" v-if="searchNotes.length">
      <div class="search-recent-header clearfix">
        <span>最近搜索</span> <a @click="clearHistory">清空</a>
      </div>
      <ul class="search-recent-item-wrap">
        <li v-for="(item, index) in searchNotes" :key="index">
          <a @click="searchItem(item)">
            <i class="el-icon-time"></i> <span>{{ item }}</span>
            <i class="el-icon-close" @click="deleteHistory($event, index)"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchListLeft",
  data() {
    return {
      searchNotes: [],
    };
  },
  mounted() {
    this.searchNotes = JSON.parse(localStorage.getItem("search-history")) || [];
  },
  methods: {
    deleteHistory(e, index) {
      e.stopPropagation();
      let arr = JSON.parse(localStorage.getItem("search-history")) || [];
      arr.splice(index, 1);
      this.searchNotes = arr;
      localStorage.setItem("search-history", JSON.stringify(arr));
    },
    clearHistory() {
      this.searchNotes = [];
      localStorage.removeItem("search-history");
    },
    searchItem(value) {
      const arr = JSON.parse(localStorage.getItem("search-history")) || [];
      const index = arr.indexOf(value);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      arr.unshift(value);

      localStorage.setItem("search-history", JSON.stringify(arr));
      this.$router.push({
        path: `/search/${value}`,
      });
      this.$router.go(0);
    },
  },
};
</script>

<style>
ul {
  padding-left: 0;
}

.search-recent .search-recent-header,
.search-trending {
  padding-left: 15px;
  padding-right: 15px;
}

.search-recent .search-recent-header {
  height: 20px;
  margin-bottom: 10px;
}

.search-recent .search-recent-header span {
  float: left;
  font-size: 14px;
  color: #969696;
}

.search-recent .search-recent-header a {
  float: right;
  font-size: 13px;
  color: #969696;
  background-color: transparent;
  border-width: 0;
  padding: 0;
}

.aside ul {
  margin-bottom: 0;
  list-style: none;
}

*,
:after,
:before {
  box-sizing: border-box;
}

.aside {
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 86px 0 0;
  padding: 0 0 30px;
  width: 280px;
  overflow: auto;
}

.aside > div:not(:last-child) {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.aside .menu li.active a,
.aside .menu li:hover a {
  background-color: #f0f0f0;
  border-radius: 4px;
}

.aside .menu a {
  padding: 10px 15px;
  font-size: 15px;
  display: block;
}

.aside .menu .setting-icon {
  margin-right: 15px;
  width: 32px;
  height: 32px;
  text-align: center;
  color: #fff;
  background-color: #a0a0a0;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
}

.aside .menu .setting-icon i {
  margin-top: 7px;
  font-size: 17px;
  display: block;
}

.aside .menu span {
  vertical-align: middle;
}

.search-recent .search-recent-item-wrap li a {
  display: block;
  height: 40px;
  line-height: 20px;
  padding: 10px 15px;
  font-size: 14px;
  color: #333;
  position: relative;
}

.search-recent .search-recent-item-wrap li a:hover {
  background-color: #f0f0f0;
  border-radius: 4px;
}

.search-recent .search-recent-item-wrap li a .el-icon-time {
  float: left;
  margin-right: 10px;
  font-size: 18px;
  color: #787878;
}

.search-recent .search-recent-item-wrap li a span {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  padding-right: 30px;
}

.search-recent .search-recent-item-wrap li a .el-icon-close {
  position: absolute;
  right: 15px;
  top: 10px;
  color: #a0a0a0;
  display: none;
}

.search-recent .search-recent-item-wrap li a:hover .el-icon-close {
  display: block;
}
</style>
