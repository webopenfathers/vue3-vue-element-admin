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
 * 获取所有用户列表的数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

/**
 * 获取用户详情
 */
export const getUserDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`
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

/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

/**
 * 获取指定用户的角色
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

/**
 * 为用户分配角色
 */
export const updateRoles = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
