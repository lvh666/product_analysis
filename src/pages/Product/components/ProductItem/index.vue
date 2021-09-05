<template>
  <div class="product-list">
    <el-card class="product-software" v-if="data">
      <div class="product-price">
        <span>{{ data.name }} </span>
        <div>
          <el-image
            style="width: 100px; height: 100px"
            :src="data.logo"
            fit="fill"
          ></el-image>
        </div>
      </div>
      <div>类型：{{ types[data.category.type] }}-{{ data.category.name }}</div>
      <div>
        下载链接：<a :href="data.downloadLocation">{{
          data.downloadLocation
        }}</a>
      </div>
      <div>好评数：{{ data.likeCount }} 差评数：{{ data.dislikeCount }}</div>
      <div style="font-weight: bold; margin: 10px 0 10px 0">描述</div>
      <div v-html="data.desc"></div>
    </el-card>

    <ProductLeft />
  </div>
</template>

<script>
// import * as echarts from "echarts";
import ProductLeft from "../ProductLeft";
import { getSoftwareItem } from "@/api/software";

export default {
  name: "ProductItem",
  components: { ProductLeft },
  data() {
    return {
      data: null,
      chartLine: null,
      types: ["软件", "游戏"],
    };
  },
  mounted() {
    this.getSoftwareItem();
  },
  methods: {
    async getSoftwareItem() {
      const res = await getSoftwareItem(this.$route.params.id);
      this.data = res.data;
      this.$store.commit("getDrawerItem", { softwareItem: res.data });
    },
  },
};
</script>

<style scoped>
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

.product-img {
  float: left;
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.min-img {
  float: left;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.product-title {
  float: left;
  width: 400px;
  font-size: 14px;
  cursor: pointer;
}

.product-software {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
.product-price {
  font-size: 26px;
  font-weight: bold;
}
.product-price em {
  float: right;
  color: #cc0000;
  font-size: 12px;
  font-style: normal;
  line-height: 25px;
}
.product-price .product-listpricespan {
  float: right;
  color: #cc0000;
  font-size: 20px;
  line-height: 20px;
}
</style>
