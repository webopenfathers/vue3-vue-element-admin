<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown :title="title" :detail="detail" @onSuccess="onSuccess" />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <Editor :title="title" :detail="detail" @onSuccess="onSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { onActivated, ref } from 'vue'
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { articleDetalil } from '@/api/article'
import { useRoute } from 'vue-router'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
}

// 处理编辑相关
const route = useRoute()
const detail = ref({})
const articleId = route.params.id
const getArticleDetail = async () => {
  detail.value = await articleDetalil(articleId)
  // 标题
  title.value = detail.value.title
}

if (articleId) {
  onActivated(getArticleDetail)
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
