import request from '@/utils/request'

/**
 * 获取项目功能
 */
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}
