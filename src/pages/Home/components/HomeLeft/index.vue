<template>
  <ul class="note-list">
    <el-row>
      <el-col
        :span="3"
        v-for="(item, index) in data"
        :key="item.id"
        :offset="index % 6 > 0 ? 1 : 0"
      >
        <el-card
          :body-style="{
            padding: '0px',
            minHeight: '240px',
            minWidth: '100px',
          }"
        >
          <el-image
            @click="
              $router.push({
                path: `/product/${item.id}`,
              })
            "
            style="width: 100%; height: 150px"
            :src="item.logo"
            fit="fill"
          ></el-image>
          <div style="padding: 14px">
            <a :href="`#/product/${item.id}`" class="title">{{ item.name }}</a>
            <div class="meta">
              <a :href="`#/product/${item.id}`">{{ item.category.name }}</a>
              <span><i class="el-icon-success"></i> {{ item.likeCount }}</span>
              <a :href="`#/product/${item.id}`">
                <i class="el-icon-error"></i> {{ item.dislikeCount }}
              </a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </ul>
</template>

<script>
import { getLikeSoftwares } from "@/api/software";

export default {
  name: "HomeLeft",
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
      const res = await getLikeSoftwares();
      this.data = res.data;
      this.loading = false;
    },
  },
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
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
  margin: 0 0 15px;
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
</style>
