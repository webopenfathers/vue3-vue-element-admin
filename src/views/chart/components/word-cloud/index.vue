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
import { getChartWordCloud } from '@/api/chart'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { watchSwitchLang } from '@/utils/i18n'
import { randomRGB } from '@/utils/color'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
/**
 * 获取数据
 */
const wordCloudData = ref([])
const getWordCloudData = async () => {
  const res = await getChartWordCloud()
  wordCloudData.value = res
  // 渲染图表
  renderChart()
}
getWordCloudData()

const target = ref(null)
let mChart = null

onMounted(() => {
  mChart = echarts.init(target.value)
})

/**
 * 渲染图表方法
 */

const renderChart = () => {
  const options = {
    title: {
      text: i18n.t('msg.chart.cloudChartTitle')
    },
    series: [
      {
        // 当前图表类型
        type: 'wordCloud',
        // 数据映射文本的大小范围
        sizeRange: [4, 80],
        // 文字旋转的范围
        rotationRange: [0, 0],
        // 单词之间的间距,
        gridSize: 0,
        // 渲染动画
        layoutAnimation: true,
        // 字体
        textStyle: {
          // 颜色
          color: randomRGB
        },
        // 高亮
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        // 数据
        data: wordCloudData.value
      }
    ]
  }
  mChart.setOption(options)
}

watchSwitchLang(() => {
  if (mChart) renderChart()
})
</script>
<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
