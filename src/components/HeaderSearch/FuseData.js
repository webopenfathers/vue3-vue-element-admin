import path from 'path-browserify'
import i18n from '@/i18n'

/**
 * 筛选出可供搜索的路由对象
 * @param {*} routes 路由表
 * @param {*} basePath 基础路径,默认 /
 * @param {*} prefixTitle 数组原因:展示父子层级
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let result = []
  for (const route of routes) {
    // 创建包含 path 和 title 的item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 当前存在 meta 时,使用 i18n 进行国际化解析处理,组合成新的title
    // 动态路由不允许被检索
    // 正则 re.exec(route.path) 没有找到返回 null 找到返回一个数组
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      result.push(data)
    }

    // 存在 children 时,迭代进行处理
    if (route.children) {
      // 传入children 父path 父title
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        result = [...result, ...tempRoutes]
      }
    }
  }
  return result
}
