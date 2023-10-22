<template>
  <div class="">
    <pan-thumb
      :image="$store.getters.userInfo.avatar"
      height="100px"
      width="100px"
    >
      <div>Hello</div>
      {{ $store.getters.userInfo.title }}
    </pan-thumb>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'
</script>

<style lang="scss" scoped></style>
