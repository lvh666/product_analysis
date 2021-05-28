<template>
  <div>
    <Header />
    <SearchList />
  </div>
</template>

<script>
import Header from "@/components/Nav/Header";
import SearchList from "./components/SearchList";

export default {
  name: "SearchResult",
  components: {
    Header,
    SearchList,
  },
};
</script>
