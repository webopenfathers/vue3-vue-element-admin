<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2-vue></s2-vue>
    </el-col>
    <el-col :span="6">
      <sheet-label-vue
        v-for="item in 6"
        :key="item"
        class="mb-20"
      ></sheet-label-vue>
    </el-col>
  </el-row>
</template>
<script setup>
import s2Vue from './components/s2.vue'
import sheetLabelVue from './components/sheet-label.vue'
</script>
<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
