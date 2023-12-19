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
import { getChartPie } from '@/api/chart'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()
const chartData = ref([])
const getChartData = async () => {
  const res = await getChartPie()
  chartData.value = res
  // 渲染图表
  renderChart()
}
getChartData()

/**
 * 初始化
 */
const target = ref(null)
let mChart

onMounted(() => {
  mChart = echarts.init(target.value)
})

/**
 * 渲染函数
 */
const renderChart = () => {
  const options = {
    title: {
      text: i18n.t('msg.chart.pieChartTitle')
    },
    tooltip: {
      trigger: 'item',
      formatter: `{b}：{c} ${i18n.t('msg.chart.unit')}`
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          formatter: '{b}：{d}%',
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold'
          }
        },
        data: chartData.value
      }
    ]
  }
  mChart.setOption(options)

  window.addEventListener('resize', () => {
    mChart.resize()
  })
}

// 语言切换重新获取 echarts
watchSwitchLang(() => {
  if (mChart) getChartData()
})
</script>
<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
