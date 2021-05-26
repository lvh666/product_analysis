<template>
  <div class="recommended-title">
    <div class="title">
      <span>推荐软件</span>
    </div>
    <ul class="list">
      <li v-for="item in data" :key="item.id">
        <a class="title">{{ item.title }}</a>
        <p>{{ item.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeRight",
  data() {
    return {
      data: [
        {
          id: "s-1",
          title: "QQ",
          content: "QQQQQQQQ",
        },
      ],
    };
  },
};
</script>

<style>
.recommended-title {
  margin-bottom: 20px;
  padding-top: 0;
  font-size: 13px;
  text-align: center;
}

.recommended-title .list {
  margin: 0 0 20px;
  text-align: left;
  list-style: none;
}

.recommended-title .list .title {
  padding-top: 5px;
  margin-right: 60px;
  font-size: 14px;
  display: block;
}

.recommended-title .title {
  text-align: left;
}

.recommended-title .list p {
  margin-top: 2px;
  font-size: 12px;
  color: #969696;
}
</style>
