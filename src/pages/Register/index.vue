<template>
  <div>
    <LoginHeader class="header" />
    <RegisterForm />
  </div>
</template>

<script>
import LoginHeader from "@/pages/Login/components/LoginHeader";
import RegisterForm from "./components/RegisterForm";

export default {
  name: "Registered",
  components: {
    LoginHeader,
    RegisterForm,
  },
};
</script>
