<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from './utils/i18n'

// 解决刷新以后主题失效的原因---head头中重新写入样式
const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
