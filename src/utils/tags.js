// 不希望被保存的路由
const whiteList = ['/login', '/404', '/401']
// 在白名单---返回false
// 不在白名单--返回true
export function isTags(path) {
  return !whiteList.includes(path)
}
