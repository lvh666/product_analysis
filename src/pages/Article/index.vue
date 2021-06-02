<template>
  <div>
    <Header />
    <ArticleContent />
    <Comment />
  </div>
</template>

<script>
import Header from "@/components/Nav/Header";
import Comment from "./components/Comment";
import ArticleContent from "./components/ArticleContent";

export default {
  name: "Article",
  components: {
    Header,
    Comment,
    ArticleContent,
  },
};
</script>
