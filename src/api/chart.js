import request from '@/utils/request'

/**
 * 累计收益明细
 */
export const getChartTrend = () => {
  return request({
    url: '/chart/trend'
  })
}
