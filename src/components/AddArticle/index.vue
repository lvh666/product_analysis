<template>
  <div>
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
        style="overflow: auto; height: 80%"
        label-width="90px"
        size="mini"
      >
        <el-form-item label="软件名称" prop="name">
          <el-input v-model="softwareForm.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="lastVersion">
          <el-input v-model="softwareForm.lastVersion"></el-input>
        </el-form-item>
        <el-form-item label="logo" prop="downloadLocation">
          <el-upload
            action="http://121.43.177.93:8098/file/upload"
            :limit="1"
            :on-change="handleChange"
            list-type="picture-card"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="软件类别" prop="value">
          <el-select
            v-model="softwareForm.type"
            filterable
            placeholder="请选择软件类别"
            :loading="softwareForm.loading"
            @blur="getTypes(softwareForm.type)"
          >
            <el-option
              v-for="item in softwareForm.types"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="softwareForm.value"
            style="margin-left: 5px"
            filterable
            placeholder="请选择软件标签"
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
        <el-form-item label="系统需求" prop="systemNeed">
          <el-input v-model="softwareForm.systemNeed"></el-input>
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
          <el-upload
            action="http://121.43.177.93:8098/file/upload"
            :on-change="handleChange1"
            :limit="1"
            :file-list="fileList1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="描述" prop="content">
          <QuillEditor @getContent="getContent" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import QuillEditor from "../QuillEditor";
import { addArticle } from "@/api/article";
import { getCategoryByType } from "@/api/types";
import { getSoftware, addSoftware } from "@/api/software";

export default {
  name: "AddArticle",
  components: {
    QuillEditor,
  },
  data() {
    return {
      fileList: [],
      fileList1: [],
      user: {},
      drawer: false,
      software: false,
      loading: false,
      form: {
        title: "",
        score: 0,
        content: "",
        loading: false,
        options: [],
        value: "",
      },
      softwareForm: {
        name: "",
        options: [],
        value: "",
        content: "",
        shelfDate: null,
        downloadLocation: "",
        logo: "",
        lastVersion: "",
        size: "",
        systemNeed: "",
        loading: false,
        type: 0,
        types: [
          {
            id: 0,
            name: "软件",
          },
          {
            id: 1,
            name: "游戏",
          },
        ],
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
          { required: true, message: "请添加软件下载地址", trigger: "change" },
        ],
        logo: [{ required: true, message: "请添加logo", trigger: "change" }],
        content: [
          { required: true, message: "请输入软件描述", trigger: "blur" },
        ],
        lastVersion: [
          { required: true, message: "请输入软件最新版本号", trigger: "blur" },
        ],
        systemNeed: [
          {
            required: true,
            message: "请输入软件系统需求如安卓5.0",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    "$store.state.drawer": function (newVal) {
      this.drawer = newVal;
      if (this.$store.state.softwareItem.user) {
        this.form.value = this.$store.state.softwareItem.id;
      }
    },
    "$store.state.software": function (newVal) {
      this.software = newVal;
    },
    drawer(newVal) {
      this.$store.commit("changeDrawer", { drawer: newVal });
    },
    software(newVal) {
      this.$store.commit("changeDrawer", { software: newVal });
    },
  },
  created() {
    this.getSoftwareItem();
    this.getTypes(this.softwareForm.type);
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")) || "";
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file, this.fileList);
      if (file.response) this.softwareForm.logo = file.response.data;
      this.fileList = fileList.slice(-3);
    },
    handleChange1(file, fileList) {
      console.log(file, this.fileList1);
      this.softwareForm.size = file.size / 1024;
      if (file.response)
        this.softwareForm.downloadLocation = file.response.data;
      this.fileList1 = fileList.slice(-3);
    },
    async getSoftwareItem() {
      this.form.loading = true;
      const res = await getSoftware({
        curPage: 1,
        pageSize: 30,
        key: "",
        categoryId: 0,
      });
      this.form.loading = false;
      this.form.options = res.data.records;
    },
    async getTypes(id) {
      this.softwareForm.loading = true;
      const res = await getCategoryByType(id);
      this.softwareForm.loading = false;
      this.softwareForm.options = res.data;
    },
    getContent(content) {
      this.drawer
        ? (this.form.content = content)
        : (this.softwareForm.content = content);
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
            console.log(data);
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
              logo: this.softwareForm.logo,
              lastVersion: this.softwareForm.lastVersion,
              size: this.softwareForm.size,
              systemNeed: this.softwareForm.systemNeed,
              type: this.softwareForm.type,
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
