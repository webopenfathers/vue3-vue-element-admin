<template>
  <div class="">用户信息</div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { getUserDetail as UserDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await UserDetail(props.id)
}

getUserDetail()

watchSwitchLang(getUserDetail)
</script>

<style lang="scss" scoped></style>
