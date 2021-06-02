<template>
  <div>
    <Header />
    <ProductItem />
  </div>
</template>

<script>
import ProductItem from "./components/ProductItem";
import Header from "@/components/Nav/Header";

export default {
  name: "Product",
  components: {
    Header,
    ProductItem,
  },
};
</script>
