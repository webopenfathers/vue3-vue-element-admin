<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

/**
 * 生成title
 */
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    // login 和 layout没有meta
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    // 国际化title
    title = generateTitle(route.meta.title)
  }

  return title
}

// 监听路由变化，动态添加tag
const store = useStore()
const route = useRoute()
watch(
  route,
  (to, from) => {
    // 并不是所有的 路由都需要保存的
    if (!isTags(to.path)) return true

    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-main {
  // 浏览器可视区域的高度 100vh
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
