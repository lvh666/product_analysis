<template>
  <div>
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
          :loading="loading"
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
  </div>
</template>

<script>
import QuillEditor from "../QuillEditor";
import { getSoftware } from "@/api/article";

export default {
  name: "AddArticle",
  components: {
    QuillEditor,
  },
  data() {
    return {
      form: {
        title: "",
        options: [],
        value: "",
        score: 0,
        content: "",
      },
      loading: false,
      rules: {
        title: [
          { required: true, message: "请输入帖子标题", trigger: "blur" },
          { min: 3, message: "帖子标题长度应该不小于3个字符", trigger: "blur" },
        ],
        value: [{ required: true, message: "请选择软件", trigger: "change" }],
        score: [{ required: true, message: "请选择分数", trigger: "change" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getSoftwareItem("");
  },
  methods: {
    async getSoftwareItem(query) {
      this.loading = true;
      const res = await getSoftware({
        curPage: 1,
        pageSize: 30,
        key: query,
        categoryId: 0,
      });
      this.loading = false;
      this.form.options = res.data.records;
    },
    getContent(content) {
      this.form.content = content;
    },
  },
};
</script>
