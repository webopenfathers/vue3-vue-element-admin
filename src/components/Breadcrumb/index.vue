<template>
  <el-breadcrumb id="guide-breadcrumb" class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span class="no-redirect" v-if="index === breadcrumData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

// 生成数组数据
const breadcrumData = ref([])
console.log(breadcrumData)
const getBreadcrumData = () => {
  // 当前路由的标准化路由记录
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

// wath 监听路有变化
const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumData()
  },
  { immediate: true }
)

// 跳转点击事件
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 将来需要主题替换,所以 hover 的颜色设置为项目的主色
const store = useStore()
const linkHover = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: v-bind(linkHover);
    }
  }

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
