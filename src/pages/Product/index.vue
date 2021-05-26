<template>
  <div>
    <Header />
    <ProductItem />
    <Comment />
  </div>
</template>

<script>
import ProductItem from "./components/ProductItem";
import Header from "@/components/Nav/Header";
import Comment from "./components/Comment";

export default {
  name: "Product",
  components: {
    Header,
    ProductItem,
    Comment,
  },
};
</script>
