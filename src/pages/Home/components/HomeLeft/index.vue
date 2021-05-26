<template>
  <ul class="note-list">
    <li v-for="item in data" :key="item.id">
      <div>
        <a :href="`#/product/${item.id}`" class="title">{{ item.title }}</a>
        <p class="abstract">{{ item.content }}</p>
        <div class="meta">
          <span class="jsd-meta">
            <i class="el-icon-view"></i> {{ item.look }}
          </span>
          <a :href="`#/product/${item.id}`">{{ item.writter }}</a>
          <a :href="`#/product/${item.id}`">
            <i class="el-icon-s-comment"></i> {{ item.comment }}
          </a>
          <span><i class="el-icon-star-on"></i> {{ item.good }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "HomeLeft",
  data() {
    return {
      data: [
        {
          id: "s-1",
          title: "《穆斯林的葬礼》：人的心中一旦有了信仰，就会不惜代价",
          content:
            "您好，欢迎来到筱北读书，今天为您解读的一本书是《穆斯林的葬礼》，这本书大约50万字，我会用20分钟的时间为你讲解书中的精髓：在爱恨情仇，悲欢离合...",
          writter: "董筱北",
          comment: 26,
          good: 154,
          look: 1000,
        },
        {
          id: "s-2",
          title: "《穆斯林的葬礼》：人的心中一旦有了信仰，就会不惜代价",
          content:
            "您好，欢迎来到筱北读书，今天为您解读的一本书是《穆斯林的葬礼》，这本书大约50万字，我会用20分钟的时间为你讲解书中的精髓：在爱恨情仇，悲欢离合...",
          writter: "董筱北",
          comment: 26,
          good: 154,
          look: 1000,
        },
        {
          id: "s-3",
          title: "《穆斯林的葬礼》：人的心中一旦有了信仰，就会不惜代价",
          content:
            "您好，欢迎来到筱北读书，今天为您解读的一本书是《穆斯林的葬礼》，这本书大约50万字，我会用20分钟的时间为你讲解书中的精髓：在爱恨情仇，悲欢离合...",
          writter: "董筱北",
          comment: 26,
          good: 154,
          look: 1000,
        },
        {
          id: "s-4",
          title: "《穆斯林的葬礼》：人的心中一旦有了信仰，就会不惜代价",
          content:
            "您好，欢迎来到筱北读书，今天为您解读的一本书是《穆斯林的葬礼》，这本书大约50万字，我会用20分钟的时间为你讲解书中的精髓：在爱恨情仇，悲欢离合...",
          writter: "董筱北",
          comment: 26,
          good: 154,
          look: 1000,
        },
      ],
    };
  },
};
</script>

<style>
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
