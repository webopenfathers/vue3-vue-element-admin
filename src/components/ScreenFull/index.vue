<template>
  <div @click="toggle">
    <span id="guide-full">
      <svg-icon
        :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      ></svg-icon>
    </span>
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="scss" scoped></style>
