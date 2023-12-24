<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2-vue :data="sheetData"></s2-vue>
    </el-col>
    <el-col :span="6">
      <sheet-label-vue
        v-for="(item, index) in regionsData"
        :key="item.id"
        :data="item"
        :isSelected="currentIndex === index"
        @click="onChangeIndex(index)"
        class="mb-20"
      ></sheet-label-vue>
    </el-col>
  </el-row>
</template>
<script setup>
import s2Vue from './components/s2.vue'
import sheetLabelVue from './components/sheet-label.vue'
import { watchSwitchLang } from '@/utils/i18n'
import { getChartRegions, getChartSheet } from '@/api/chart'
import { ref } from 'vue'

/**
 * 获取大区数据
 */
const regionsData = ref([])

const getChartRegionsData = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions
  getChartSheetData(regionsData.value[0].id)
}

watchSwitchLang(getChartRegionsData)

// 选中
const currentIndex = ref(0)
const onChangeIndex = (index) => {
  currentIndex.value = index
  // 切换大区时重新获取表格数据
  getChartSheetData(regionsData.value[currentIndex.value].id)
}

/**
 * 大区对应的表格数据
 */
const sheetData = ref([])
const getChartSheetData = async (id) => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
</script>
<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
