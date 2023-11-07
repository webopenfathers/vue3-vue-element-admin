import request from '@/utils/request'

/**
 * 获取用户列表的数据
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    data
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
