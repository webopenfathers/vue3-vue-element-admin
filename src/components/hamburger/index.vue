<template>
  <div class="hamburger-container" @click="toggleClick">
    <span id="guide-hamburger">
      <svg-icon class="hamburger" :icon="icon"></svg-icon>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

// 依据开/关 返回动态icon
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
