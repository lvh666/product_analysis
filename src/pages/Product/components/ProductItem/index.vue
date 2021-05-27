<template>
  <div class="product-list">
    <el-card class="product-card">
      <div class="product-img">
        <img src="" alt="图片" />
      </div>
      <div class="product-price">
        <span style="float: left"
          >全网最低价：
          <div class="product-listpricespan">5799.00</div>
          <em>￥</em>
        </span>
      </div>
      <br />
      <br />
      <div>
        <span>类目销量排名第 52 位</span><br />
        <span>品牌：苹果手机</span><br />
        <span>上市时间：2020年10月</span><br />
        <span>网络制式：全网通5G</span>
      </div>
    </el-card>

    <div
      id="chartLine"
      style="float: right; width: 30%; height: 500px; margin-top: 10px"
    ></div>

    <el-card class="product-card" style="width: 65%">
      <div
        style="overflow: hidden"
        class="v-card"
        v-for="item in data"
        :key="item.id"
      >
        <div class="product-img">
          <img :src="item.src" alt="图片" />
        </div>
        <div class="product-title">
          <span>{{ item.title }}</span>
        </div>
        <div class="product-price">
          <div class="product-listpricespan">{{ item.price }}</div>
          <em>￥</em>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ProductItem",
  data() {
    return {
      data: [
        {
          id: "s-1",
          src: "",
          title: "Apple iPhone 12 256G 蓝色 移动联通电信 5G手机",
          price: 7099,
        },
        {
          id: "s-2",
          src: "",
          title:
            "苹果(Apple) iPhone 12 256GB 蓝色 移动联通电信5G全网通手机 双卡双待 苹果iphone12",
          price: 6788,
        },
        {
          id: "s-3",
          src: "",
          title:
            "Apple iPhone 12 (A2404) 256GB 蓝色 支持移动联通电信5G 双卡双待手机",
          price: 6979,
        },
        {
          id: "s-4",
          src: "",
          title: "Apple/苹果 iPhone 12",
          price: 7599,
        },
      ],
      chartLine: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLineChart();
    });
  },
  methods: {
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["最低价", "平均价"],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisTick: {
              show: false,
            },
            data: [
              "2021-3-1",
              "2021-3-11",
              "2021-3-21",
              "2021-3-31",
              "2021-4-1",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            name: "元",
          },
        ],
        series: [
          {
            name: "最低价",
            type: "line",
            stack: "总量",
            data: [7586, 7586, 7661, 7611, 7611],
          },
          {
            name: "平均价",
            type: "line",
            stack: "总量",
            data: [7299, 7299, 7599, 7399, 7399],
          },
        ],
      };
      this.chartLine.setOption(option);
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

.product-price {
  float: left;
  width: 200px;
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
