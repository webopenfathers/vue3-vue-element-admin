<template>
  <!-- 1.创建 dom 容器，指定大小 -->
  <div class="trend-chart-container" ref="target"></div>
</template>
<script setup>
// 2.导入echarts模块
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 3.利用 echarts.init(target),获取到 mChart 实例
const target = ref(null)
let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  // 4.构建 options 配置对象 (echarts 渲染核心)
  const options = {
    // 鼠标移入之后展示提示框
    tooltip: {
      // 鼠标移入到坐标轴，触发提示
      trigger: 'axis',
      // 移入坐标轴时，提示框展示内容的配置
      axisPointer: {
        // 显示十字准星
        type: 'cross',
        // 指示器的样式
        crossStyle: {
          // 色值
          color: '#999'
        }
      }
    },
    // 图例配置
    legend: {
      data: ['月累计收益', '日收益曲线'],
      // 图例展示位置
      right: 0
    },
    // echarts 网格绘制的位置
    grid: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
      // 计算边距时包含标签
      containLabel: true
    },
    // X 轴配置
    xAxis: {
      // 坐标轴类型
      type: 'category',
      // 坐标轴的数据
      data: props.data.monthAmountList.map((item) => item.time),
      // 刻度尺
      axisTick: {
        show: false
      }
    },
    // Y 轴配置
    yAxis: {
      // 坐标轴类型
      type: 'value',
      // 最小值
      min: 0,
      // 最大值
      max: function (value) {
        return parseInt(value.max * 1.2)
      },
      // 刻度展示文字
      axisLabel: {
        formatter: '{value} 万元'
      }
    },
    // 图表绘制
    series: [
      // 柱状图
      {
        // 图表类型
        type: 'bar',
        // 图表的名字,对应图例
        name: '月累计收益',
        // 柱子的宽度
        barWidth: 20,
        // 提示框的展示内容
        tooltip: {
          valueFormatter: function (value) {
            return value + '万元'
          }
        },
        // 数据源
        data: props.data.monthAmountList.map((item) => item.amount)
      },
      // 曲线图
      {
        // 图表类型
        type: 'line',
        // 颜色
        color: '#6ec6d0',
        // 平滑
        smooth: true,
        // 图表的名字,对应图例
        name: '日收益曲线',
        // 提示框的展示内容
        tooltip: {
          valueFormatter: function (value) {
            return value + '万元'
          }
        },
        // 数据源
        data: props.data.dailyCurve.map((item) => item.amount)
      }
    ]
  }

  // 5. 利用 mChart.setOption 方法配置options
  mChart.setOption(options)

  window.addEventListener('resize', () => {
    mChart.resize()
  })
}
</script>
<style scoped lang="scss">
.trend-chart-container {
  height: 100%;
}
</style>
