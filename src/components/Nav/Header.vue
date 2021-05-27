<template>
  <div class="m-header">
    <div class="m-header-box">
      <router-link to="/" class="btn">软件产品</router-link>
      <div class="recommend-header">
        <router-link to="/" class="type-recommend">首页</router-link>
      </div>
      <div class="right-header">
        <div class="box-header user-header">
          <a @click="toManage('MyInfo')" v-if="user">
            <img class="i-box-header i-user" :src="user.avatar" />
          </a>
          <a @click="toAddress('login')" v-else>
            <img class="i-box-header i-user" src="../../assets/user.png" />
          </a>
          <a @click="toManage('MyInfo')" v-if="user.username">
            <div class="span-box-header name-user show">
              {{ user.username }}
            </div>
          </a>
          <div class="login-user show">
            <span
              @click="toAddress('login')"
              class="span-box-header span-user"
              v-if="!user"
              >登录
            </span>
            <span @click="exit()" class="span-box-header span-user" v-else>
              退出登录
            </span>
          </div>
        </div>
      </div>
      <el-button
        icon="el-icon-edit"
        style="margin-top: 14px; float: right"
        type="primary"
        @click="showDrawer"
        round
      >
        发布
      </el-button>
      <div class="search-header">
        <img class="i-search" src="../../assets/search.png" alt="搜索" />
        <input class="input-search" v-model="search" placeholder="搜索" />
        <div class="btn-search" @click="searchItem">搜索</div>
        <div class="list-search-wrap">
          <div class="list-search"></div>
        </div>
      </div>
      <el-drawer ref="drawer" :visible.sync="drawer" size="50%">
        <div slot="title">
          <el-button type="primary" @click="submit" :loading="loading">{{
            loading ? "提交中 ..." : "发布"
          }}</el-button>
        </div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          style="width: 95%"
          size="mini"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="软件信息" prop="value">
            <el-select
              v-model="form.value"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :loading="form.loading"
            >
              <el-option
                v-for="item in form.options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评分" prop="score">
            <el-rate v-model="form.score" show-text></el-rate>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <QuillEditor @getContent="getContent" />
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-drawer ref="software" :visible.sync="software" size="50%">
        <div slot="title">
          <el-button type="primary" @click="submit" :loading="loading">{{
            loading ? "提交中 ..." : "发布"
          }}</el-button>
        </div>
        <el-form
          ref="softwareForm"
          :model="softwareForm"
          :rules="softwareRules"
          label-width="90px"
          style="width: 95%"
          size="mini"
        >
          <el-form-item label="软件名称" prop="name">
            <el-input v-model="softwareForm.name"></el-input>
          </el-form-item>
          <el-form-item label="软件类别" prop="value">
            <el-select
              v-model="softwareForm.value"
              filterable
              placeholder="请选择软件类别"
              :loading="softwareForm.loading"
            >
              <el-option
                v-for="item in softwareForm.options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="软件时间" prop="shelfDate">
            <el-date-picker
              v-model="softwareForm.shelfDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下载地址" prop="downloadLocation">
            <el-input v-model="softwareForm.downloadLocation"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="content">
            <QuillEditor @getContent="getContent" />
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import "@/styles/mainHeader.css";
import QuillEditor from "../QuillEditor";
import { getSoftware, addArticle } from "@/api/article";
import { getSoftwareTypes, addSoftware } from "@/api/software";

export default {
  name: "Header",
  components: {
    QuillEditor,
  },
  data() {
    return {
      user: {},
      search: "",
      drawer: false,
      software: false,
      loading: false,
      form: {
        title: "",
        options: [],
        value: "",
        score: 0,
        content: "",
        loading: false,
      },
      softwareForm: {
        name: "",
        options: [],
        value: "",
        content: "",
        shelfDate: null,
        downloadLocation: "",
        loading: false,
      },
      rules: {
        title: [
          { required: true, message: "请输入帖子标题", trigger: "blur" },
          { min: 3, message: "帖子标题长度应该不小于3个字符", trigger: "blur" },
        ],
        value: [{ required: true, message: "请选择软件", trigger: "change" }],
        score: [{ required: true, message: "请选择分数", trigger: "change" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      softwareRules: {
        name: [
          { required: true, message: "请输入软件名称", trigger: "blur" },
          { min: 1, message: "软件名称长度应该不小于3个字符", trigger: "blur" },
        ],
        value: [
          { required: true, message: "请选择软件类型", trigger: "change" },
        ],
        shelfDate: [
          {
            type: "date",
            required: true,
            message: "请选择软件时间",
            trigger: "change",
          },
        ],
        downloadLocation: [
          { required: true, message: "请添加软件下载地址", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入软件描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getSoftwareItem("");
    this.getTypes();
  },
  mounted() {
    this.search = this.$route.params.value || "";
    this.user = JSON.parse(localStorage.getItem("user")) || "";
  },
  methods: {
    showDrawer() {
      this.$route.path.split("/")[1] === "product"
        ? (this.drawer = true)
        : (this.software = true);
    },
    async getSoftwareItem(query) {
      this.form.loading = true;
      const res = await getSoftware({
        curPage: 1,
        pageSize: 30,
        key: query,
        categoryId: 0,
      });
      this.form.loading = false;
      this.form.options = res.data.records;
    },
    async getTypes() {
      this.softwareForm.loading = true;
      const res = await getSoftwareTypes({
        curPage: 1,
        pageSize: 30,
        categoryId: 0,
      });
      this.softwareForm.loading = false;
      this.softwareForm.options = res.data.records;
    },
    getContent(content) {
      this.drawer
        ? (this.form.content = content)
        : (this.softwareForm.content = content);
    },
    exit() {
      this.user = {};
      localStorage.removeItem("user");
      this.toAddress("login");
    },
    toAddress(path) {
      this.$router.push({
        path: `/${path}`,
      });
    },
    searchItem() {
      const arr = JSON.parse(localStorage.getItem("search-history")) || [];
      const index = arr.indexOf(this.search);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      arr.unshift(this.search);

      localStorage.setItem("search-history", JSON.stringify(arr));
      if (this.search) {
        if (this.$route.path.slice(0, 7) === "/search") {
          this.$router.push({
            path: `/search/${this.search}`,
          });
          this.$router.go(0);
        } else {
          this.$router.push({
            path: `/search/${this.search}`,
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "搜索框不能为空",
          type: "error",
        });
      }
    },
    submit() {
      this.loading = true;
      if (this.drawer) {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            this.drawer = false;
            const software = await this.form.options.filter(
              (option) => option.id === this.form.value
            );
            const data = {
              categoryId: software[0].category?.id,
              categoryName: software[0].category?.name,
              content: this.form.content,
              score: this.form.score,
              softwareId: software[0].id,
              softwareName: software[0].name,
              title: this.form.title,
              userId: this.user.id,
            };
            const res = await addArticle(data);
            console.log(res);
            this.loading = false;
            this.drawer = false;
            this.$message({
              message: "发布成功",
              type: "success",
            });
          } else {
            this.loading = false;
            this.$message.error("error submit!!");
          }
        });
      } else if (this.software) {
        this.$refs["softwareForm"].validate(async (valid) => {
          if (valid) {
            const data = {
              categoryId: this.softwareForm.value,
              desc: this.softwareForm.content,
              downloadLocation: this.softwareForm.downloadLocation,
              name: this.softwareForm.name,
              shelfDate: this.softwareForm.shelfDate.getTime(),
              userId: this.user.id,
            };
            const res = await addSoftware(data);
            console.log(res);
            this.loading = false;
            this.software = false;
            this.$message({
              message: "发布成功",
              type: "success",
            });
          } else {
            this.loading = false;
            this.$message.error("error submit!!");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.btn {
  float: left;
  margin-top: 12px;
  width: 121px;
  height: 46px;
  line-height: 46px;
  overflow: hidden;
  text-align: center;
  border: 1px solid #ebebeb;
  font-size: 14px;
  color: #888;
  text-decoration: none;
  cursor: pointer;
}
</style>
