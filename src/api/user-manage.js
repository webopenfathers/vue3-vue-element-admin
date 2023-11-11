import request from '@/utils/request'

/**
 * 获取用户列表的数据
 */
export const getUserManageList = (params) => {
  return request({
    url: '/user-manage/list',
    params
  })
}

/**
 * 批量上传
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
