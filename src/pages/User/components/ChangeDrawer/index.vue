<template>
  <div>
    <el-drawer ref="drawer" :visible.sync="drawer" size="50%">
      <div slot="title">
        <el-button type="primary" @click="submit" :loading="loading">{{
          loading ? "提交中 ..." : "修改"
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
          <QuillEditor :content="form.content" @getContent="getContent" />
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
          <QuillEditor
            :content="softwareForm.content"
            @getContent="getContent"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import QuillEditor from "@/components/QuillEditor";
import { getSoftware, changeArticle } from "@/api/article";
import { getSoftwareTypes, changeSoftware } from "@/api/software";

export default {
  name: "ChangeDrawer",
  props: {
    id: {
      type: String,
    },
  },
  components: {
    QuillEditor,
  },
  data() {
    return {
      user: {},
      softwareData: {},
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
  watch: {
    "$store.state.changeDrawer": function (newVal) {
      this.drawer = newVal;
      if (this.drawer) {
        const item = this.$store.state.articleItem;
        this.form.value = item.softwareId;
        this.form.content = item.content;
        this.form.score = item.score;
        this.form.title = item.title;
      }
    },
    "$store.state.changeSoftware": function (newVal) {
      this.software = newVal;
      if (this.software) {
        const item = this.$store.state.softwareItem;
        this.softwareForm.value = item.category?.id;
        this.softwareForm.content = item.desc;
        this.softwareForm.downloadLocation = item.downloadLocation;
        this.softwareForm.name = item.name;
        this.softwareForm.shelfDate = new Date(item.shelfDate);
      }
    },
    drawer(newVal) {
      this.$store.commit("changeDrawer", { changeDrawer: newVal });
    },
    software(newVal) {
      this.$store.commit("changeDrawer", { changeSoftware: newVal });
    },
  },
  created() {
    this.getSoftwares("");
    this.getTypes();
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")) || "";
  },
  methods: {
    async getSoftwares(query) {
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
            const res = await changeArticle(data);
            this.loading = false;
            if (res.msg === "success") {
              this.$emit("getArticle");
              this.drawer = false;
              this.$message({
                message: "修改成功",
                type: "success",
              });
            } else {
              this.$message.error("修改失败");
            }
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
            const res = await changeSoftware(
              data,
              this.$store.state.softwareItem.id
            );
            this.loading = false;
            if (res.msg === "success") {
              this.$emit("getSoftwares");
              this.software = false;
              this.$message({
                message: "修改成功",
                type: "success",
              });
            } else {
              this.$message.error("修改失败");
            }
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
