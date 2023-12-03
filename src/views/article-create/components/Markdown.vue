<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <!-- 按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>
<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { onMounted, defineProps, defineEmits } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle } from './commit'

const props = defineProps({
  title: {
    required: true,
    type: String
  }
})

const emits = defineEmits(['onSuccess'])

// Editor 实例
let mkEditor
let el

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MKEditor({
    // el
    el,
    // 高度
    height: '500px',
    // 样式
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

watchSwitchLang(() => {
  if (!el) return true
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

const onSubmitClick = async () => {
  await commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })

  mkEditor.reset()
  emits('onSuccess')
}
</script>
<style scoped lang="scss">
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
