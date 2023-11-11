<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modeValue"
    @close="closed"
    width="30%"
  >
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
defineProps({
  modeValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 导出文件名
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 确定
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const { list } = await getUserManageAllList()
  console.log(list)
  closed()
}
</script>

<style></style>
