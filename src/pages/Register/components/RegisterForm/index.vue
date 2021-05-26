<template>
  <div>
    <div class="register-form">
      <div class="fm-content">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form
                status-icon
                label-width="100px"
                :model="form"
                :rules="rules"
                ref="form"
                class="demo-ruleForm from"
              >
                <el-form-item label="手机号" prop="username">
                  <el-input
                    @change="checkPhone"
                    v-model="form.username"
                  ></el-input>
                </el-form-item>
                <el-form-item label="输入密码" prop="password">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="6-20个字符"
                    placement="right"
                  >
                    <el-input
                      type="password"
                      v-model="form.password"
                      placeholder="输入密码"
                      autocomplete="off"
                    ></el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                  <el-input
                    type="password"
                    v-model="form.checkPassword"
                    placeholder="再次输入密码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="滑动验证码" prop="check1">
                  <CheckedImg @patch="getStatus" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('form')"
                    >注册</el-button
                  >
                </el-form-item>
              </el-form>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import CheckedImg from "../CheckedImg";

export default {
  name: "Registered",
  components: {
    CheckedImg,
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("密码格式不正确"));
      } else {
        if (this.form.checkPassword !== "") {
          this.$refs.form.validateField("checkPassword");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("密码不一致!"));
      } else {
        callback();
      }
    };
    let validateChecked1 = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error("滑动验证不通过"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号格式错误"));
      } else if (this.status) {
        callback(new Error("手机号已被注册"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        checkPassword: "",
        verification: "",
        check: 1,
        check1: 0,
      },
      status: false,
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        password: [
          { validator: validatePass, required: true, trigger: "blur" },
        ],
        checkPassword: [
          { validator: validatePass2, required: true, trigger: "blur" },
        ],
        check1: [{ validator: validateChecked1, trigger: "change" }],
      },
    };
  },
  methods: {
    getStatus(data) {
      this.form.check1 = data ? 1 : 0;
      this.$refs["form"].validateField("check1");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.check1 !== 0) {
          let item = {
            password: this.form.password,
            phoneNumber: this.form.username,
          };
          this.$api.post(
            "user/register",
            item,
            (res) => {
              if (res.data.msg === "注册成功") {
                this.$router.push({
                  path: `/login`,
                });
              } else {
                this.$message.error("注册失败!");
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      //
    },
    checkedChange() {
      this.form.check = this.checked ? 1 : 0;
    },
    checkPhone() {
      this.$api.get(
        "user/register/phone?phoneNumber=" + this.form.username,
        null,
        (res) => {
          if (res.data.msg === "手机号未注册") {
            this.status = false;
          } else {
            this.status = true;
          }
          this.$refs["form"].validateField("username");
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style scoped>
.header {
  height: 90px;
}
.register-form {
  background-color: #f8f8f8;
  padding-top: 40px;
  padding-bottom: 50px;
}
.fm-content {
  width: 1200px;
  height: 500px;
  background: #fff;
  padding-top: 40px;
  margin: 0 auto;
}
a {
  color: #5584ff;
  text-decoration: none;
}
a:link,
a:visited {
  color: #5584ff;
}
</style>
