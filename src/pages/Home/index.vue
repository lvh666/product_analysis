<template>
  <div>
    <Header />
    <HomeContent />
  </div>
</template>

<script>
import Header from "@/components/Nav/Header";
import HomeContent from "./components/HomeContent";

export default {
  name: "Home",
  components: {
    HomeContent,
    Header,
  },
};
</script>
