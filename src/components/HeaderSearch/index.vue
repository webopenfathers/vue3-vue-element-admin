<template>
  <div class="header-search" :class="{ show: isShow }">
    <span id="guide-search" class="icon-click" @click.stop="onShowClick">
      <svg-icon class-name="search-icon" icon="search"></svg-icon
    ></span>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

// 数据源
const router = useRouter()
const searchPool = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateRoutes(fRoutes)
})

console.log(searchPool.value)
// 搜索库相关
// 参数一:数据源searchPool
// 参数二:配置对象
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool.value, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表.支持嵌套路径,加权搜索,在字符串和对象数组中搜索.
    // name:搜索的键
    // weight:对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool)

// 控制 search 展示
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

watch(isShow, (val) => {
  if (val) {
    // search 输入框为打开状态
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    // search 输入框为关闭状态
    document.body.removeEventListener('click', onClose)
  }
})

// 关闭事件
const headerSearchSelectRef = ref(null)
const onClose = () => {
  // 失去焦点
  headerSearchSelectRef.value.blur()
  // 关闭和清空
  isShow.value = false
  searchOptions.value = []
  search.value = ''
}

// search 相关
const search = ref('')
// 搜索方法
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 选中回调-跳转
const onSelectChange = (val) => {
  router.push(val.path)
}

// 监听到语言变化--重新回调初始化Fuse
watchSwitchLang(() => {
  initFuse(searchPool)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .icon-click {
    display: inline-block;
  }
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
