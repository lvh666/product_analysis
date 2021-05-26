<template>
  <div class="bg">
    <div class="login">
      <div class="container">
        <div id="login">
          <div
            class="login-tabs"
            style="font-size: 24px; margin-bottom: 20px; margin-top: 10px"
          >
            <p>密码登录</p>
          </div>
          <div class="login-content">
            <div id="login-error">
              <i class="icon-warning el-icon-warning"></i>
              <div class="login-error-msg">{{ msg }}</div>
            </div>
            <div class="login-form">
              <div class="fm-field">
                <div>
                  <label class="fm-label-icon">
                    <i class="el-icon-user" title="用户名"></i>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    class="fm-text"
                    placeholder="请输入用户名"
                    v-model="form.username"
                  />
                </div>
              </div>
              <div class="fm-field">
                <div>
                  <label class="fm-label-icon">
                    <i class="el-icon-lock" title="密码"></i>
                  </label>
                </div>
                <div>
                  <input
                    type="password"
                    class="fm-text"
                    placeholder="请输入登录密码"
                    v-model="form.password"
                  />
                </div>
              </div>
              <div>
                <button class="fm-btn" @click="onSubmit()">登录</button>
              </div>
              <div class="login-blocks">
                <router-link to="/Register">免费注册</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/Login.css";
import { login } from "@/api/user";
export default {
  name: "LoginContent",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      msg: "",
    };
  },
  methods: {
    async onSubmit() {
      let l = document.getElementById("login-error");
      if (this.form.username === "") {
        l.style.display = "block";
        this.msg = "请输入用户名";
      } else if (this.form.password === "") {
        l.style.display = "block";
        this.msg = "请输入密码";
      } else {
        let item = {
          phone: this.form.username,
          password: this.form.password,
        };
        const res = await login(item);
        if (res.msg === "success") {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.$router.push({
            path: `/`,
          });
        } else {
          l.style.display = "block";
          this.msg = "用户名或密码错误";
        }
      }
    },
  },
};
</script>
