<template>
  <!-- 1.创建 dom 容器，指定大小 -->
  <div class="trend-chart-container" ref="target"></div>
</template>
<script setup>
// 2.导入echarts模块
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()
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
      data: [i18n.t('msg.chart.monthIncome'), i18n.t('msg.chart.dayIncome')],
      // 图例展示位置
      left: 'center',
      top: 0
    },
    toolbox: {
      feature: {
        saveAsImage: {
          name: i18n.t('msg.chart.monthIncome')
        },
        dataView: {
          optionToContent: function (opt) {
            const axisData = opt.xAxis[0].data
            const series = opt.series
            let table =
              '<table style="width:100%;text-align:center"><tbody><tr>' +
              `<td style="font-size:18px;font-weight:700">${i18n.t(
                'msg.chart.trendTime'
              )}</td>` +
              '<td style="font-size:18px;font-weight:700">' +
              series[0].name +
              '</td>' +
              '<td style="font-size:18px;font-weight:700">' +
              series[1].name +
              '</td>' +
              '</tr>'
            for (let i = 0, l = axisData.length; i < l; i++) {
              table +=
                '<tr>' +
                '<td>' +
                axisData[i] +
                '</td>' +
                '<td>' +
                series[0].data[i] +
                '</td>' +
                '<td>' +
                series[1].data[i] +
                '</td>' +
                '</tr>'
            }
            table += '</tbody></table>'
            return table
          },
          readOnly: true
        }
      }
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
        formatter: `{value} ${i18n.t('msg.chart.unit')}`
      }
    },
    // 图表绘制
    series: [
      // 柱状图
      {
        // 图表类型
        type: 'bar',
        // 图表的名字,对应图例
        name: i18n.t('msg.chart.monthIncome'),
        // 柱子的宽度
        barWidth: 20,
        // 提示框的展示内容
        tooltip: {
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
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
        name: i18n.t('msg.chart.dayIncome'),
        // 提示框的展示内容
        tooltip: {
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
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

watchSwitchLang(() => {
  if (mChart) renderChart()
})
</script>
<style scoped lang="scss">
.trend-chart-container {
  height: 100%;
}
</style>
