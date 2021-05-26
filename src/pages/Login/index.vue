<template>
  <div>
    <LoginHeader class="header" />
    <LoginForm />
  </div>
</template>

<script>
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
export default {
  name: "Login",
  components: {
    LoginHeader,
    LoginForm,
  },
};
</script>

<style scoped>
.header {
  height: 90px;
}
</style>
