<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>
<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import { TableSheet } from '@antv/s2'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const target = ref(null)
let s2
onMounted(() => {
  const s2Options = {
    // 指定图表的宽高---决定了图表渲染的大小
    width: target.value.clientWidth,
    height: target.value.clientHeight,
    // 是否显示行号
    showSeriesNumber: true,
    // 设置背景
    conditions: {
      background: [
        {
          // 设置背景的字段
          field: 'balance',
          // 映射函数 fieldValue当前字段的value值
          mapping(fieldValue) {
            return {
              fill: fieldValue > 0 ? '#f3fff3' : '#ffe7e7'
            }
          }
        }
      ]
    }
  }

  s2 = new TableSheet(target.value, {}, s2Options)
})

/**
 * 图表渲染方法
 */
const renderChart = () => {
  const s2DataCfg = {
    fields: {
      columns: [
        'province',
        'city',
        'coverage',
        'receivable',
        'actual',
        'balance'
      ]
    },
    meta: [
      {
        field: 'province',
        name: i18n.t('msg.chart.sheetProvince')
      },
      {
        field: 'city',
        name: i18n.t('msg.chart.sheetCity')
      },
      {
        field: 'coverage',
        name: i18n.t('msg.chart.sheetCoverage')
      },
      {
        field: 'receivable',
        name: i18n.t('msg.chart.sheetReceivable')
      },
      {
        field: 'actual',
        name: i18n.t('msg.chart.sheetActual')
      },
      {
        field: 'balance',
        name: i18n.t('msg.chart.sheetBalance')
      }
    ],
    data: props.data
  }
  // 更新数据
  s2.setDataCfg(s2DataCfg)

  // 重新触发 render 函数，但是此时现需要在 render 中传递 true,表示数据发生了变化
  s2.render(true)
}

watch(() => props.data, renderChart)
</script>
<style lang="scss" scoped>
.container {
  height: 782px;
}
</style>
