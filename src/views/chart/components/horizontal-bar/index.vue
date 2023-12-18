<template>
  <el-card :body-style="{ paddding: '12px' }">
    <div class="container" ref="target"></div>
  </el-card>
</template>
<script setup>
import { getChartTimeAmount } from '@/api/chart'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import emitter from '@/utils/eventHub'

const i18n = useI18n()

// 获取数据
const data = ref([])
const getData = async (date) => {
  const { result } = await getChartTimeAmount(date)
  data.value = result
  renderChart()
}

getData({ date: new Date() })

// 图表初始化
const target = ref(null)
let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
})

// 渲染图表
const renderChart = () => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [
        `${i18n.t('msg.chart.income')} ${i18n.t('msg.chart.unit')}`,
        `${i18n.t('msg.chart.expend')} ${i18n.t('msg.chart.unit')}`,
        `${i18n.t('msg.chart.balance')} ${i18n.t('msg.chart.unit')}`
      ],
      right: 0
    },
    grid: {
      top: 28,
      right: 10,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      data: data.value.map((item) => item.timeStr),
      inverse: true
    },
    series: [
      {
        name: `${i18n.t('msg.chart.income')} ${i18n.t('msg.chart.unit')}`,
        type: 'bar',
        // 数据堆叠：相同名字的stack会被堆叠到同一行
        stack: 'total',
        label: {
          show: true,
          position: 'right'
        },
        color: '#6dc473',
        emphasis: {
          focus: 'series'
        },
        data: data.value.map((item) => item.income)
      },
      {
        name: `${i18n.t('msg.chart.expend')} ${i18n.t('msg.chart.unit')}`,
        type: 'bar',
        // 数据堆叠：相同名字的stack会被堆叠到同一行
        stack: 'total',
        label: {
          show: true,
          position: 'right'
        },
        color: '#e47470',
        emphasis: {
          focus: 'series'
        },
        data: data.value.map((item) => item.expense)
      },
      {
        name: `${i18n.t('msg.chart.balance')} ${i18n.t('msg.chart.unit')}`,
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        color: '#83c0df',
        emphasis: {
          focus: 'series'
        },
        data: data.value.map((item) => item.balance)
      }
    ]
  }
  mChart.setOption(options)
  window.addEventListener('resize', () => {
    mChart.resize()
  })
}

/**
 * 日历图联动
 */
emitter.on('calendarChange', (val) => {
  console.log(val)
  getData({ date: val })
})

// 国际化切换
watchSwitchLang(() => {
  if (mChart) renderChart()
})
</script>
<style lang="scss" scoped>
.container {
  height: 418px;
}
</style>
