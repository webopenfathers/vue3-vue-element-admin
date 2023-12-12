<template>
  <el-card class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <!-- 数据模块 -->
        <trend-data-vue></trend-data-vue>
      </el-col>

      <el-col :span="18">
        <!-- 图表模块 -->
        <trend-chart-vue></trend-chart-vue>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
import trendDataVue from './trend-data.vue'
import trendChartVue from './trend-chart.vue'
</script>
<style lang="scss" scoped>
.container {
  height: 286px;
  background-color: #bcbfc3;
}
</style>
