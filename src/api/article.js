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

/**
 * 文章详情
 */
export const articleDetalil = (articleId) => {
  return request({
    url: `/article/${articleId}`
  })
}

/**
 * 创建文章
 */
export const createArticle = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

/**
 * 编辑文章
 */
export const editorArticle = (data) => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
