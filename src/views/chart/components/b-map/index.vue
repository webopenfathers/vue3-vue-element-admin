<template>
  <el-card class="container">
    <div class="title">{{ $t('msg.chart.bmapChartTitle') }}</div>
    <div ref="target" class="box"></div>
  </el-card>
</template>
<script setup>
import { getChartMap } from '@/api/chart'
import { ref, onMounted } from 'vue'
// 导入 bmap 模块
import 'echarts/extension/bmap/bmap.js'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
/**
 * 获取数据
 */

const chartData = ref({})

const getChartData = async () => {
  const res = await getChartMap()
  chartData.value = res
  // 渲染地图+echarts
  renderBMap()
}

getChartData()

/**
 * 数据转化方法---百度地图+echarts渲染数据，格式必须为 [{name:'北京',value:['经度','纬度','数值']}]
 */
const convertData = (data) => {
  const res = []
  data.forEach((item) => {
    const geoCoord = chartData.value.geoCoordMap[item.name]
    geoCoord && res.push({ name: item.name, value: [...geoCoord, item.value] })
  })
  return res
}

const target = ref(null)
let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
})

/**
 * 渲染视图
 */
const renderBMap = () => {
  const options = {
    tooltip: {
      trigger: 'item'
    },
    // 地图配置
    bmap: {
      // 中心点---经纬度
      center: [109.114129, 36.550339],
      // 缩放级别
      zoom: 5,
      // 是否可拖动
      roam: true
    },
    series: [
      // 所有点
      {
        name: `营收 (${i18n.t('msg.chart.unit')})`,
        type: 'scatter',
        // 点坐标---bmp表示地图的点坐标
        coordinateSystem: 'bmap',
        // 点数据
        data: convertData(chartData.value.data),
        // 散点大小
        symbolSize: (val) => {
          return val[2] / 10
        },
        // 数据使用的值
        encode: {
          // value:['经度','纬度','数值']---索引
          value: 2
        },
        emphasis: {
          label: {
            show: true
          }
        },
        color: '#15803d'
      },
      // TOP 5的点
      {
        name: `营收 TOP 5 (${i18n.t('msg.chart.unit')})`,
        type: 'effectScatter',
        // 点坐标---bmp表示地图的点坐标
        coordinateSystem: 'bmap',
        // 点数据
        data: convertData(
          chartData.value.data
            .sort((a, b) => {
              return b.value - a.value
            })
            .slice(0, 5)
        ),
        // 散点大小
        symbolSize: (val) => {
          return val[2] / 10
        },
        // 数据使用的值
        encode: {
          // value:['经度','纬度','数值']---索引
          value: 2
        },
        // 特效-波纹
        rippleEffect: {
          brushType: 'stroke'
        },
        // 是否显示地名
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        zlevel: 2,
        color: '#166534'
      }
    ]
  }
  mChart.setOption(options)
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  .title {
    position: absolute;
    top: 28px;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #333;
    font-size: 22px;
    font-weight: bold;
    z-index: 9;
  }

  .box {
    height: 462px;
  }
}
</style>
