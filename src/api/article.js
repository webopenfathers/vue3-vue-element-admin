import request from '@/utils/request'

/**
 * 获取所有文章
 */
export const getArticleList = (params) => {
  return request({
    url: '/article/list',
    params
  })
}
