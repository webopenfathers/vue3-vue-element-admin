<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'

const onSuccess = (excellData) => {
  console.log(excellData)
}
</script>

<style lang="scss" scoped></style>
