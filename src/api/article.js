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

/**
 * 修改文章排名
 */
export const articleSort = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

/**
 * 删除文章
 */
export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`
  })
}
