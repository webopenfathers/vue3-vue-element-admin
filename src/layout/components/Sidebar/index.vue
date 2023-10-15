<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        imooc-admin
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import SidebarMenu from './SidebarMenu.vue'
const logoHeight = ref(44)
const logoHeightCssVar = computed(() => logoHeight.value + 'px')
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeightCssVar);
  padding: 10px 0px 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }

  .el-avatar {
    // 去掉avatar组件的背景色
    --el-avatar-background-color: none;
  }
}
</style>
