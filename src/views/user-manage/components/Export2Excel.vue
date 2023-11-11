<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modeValue"
    @close="closed"
    width="30%"
  >
    <el-input :placeholder="$t('msg.excel.placeholder')"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  modeValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 确定
const onConfirm = () => {
  closed()
}
</script>

<style></style>
