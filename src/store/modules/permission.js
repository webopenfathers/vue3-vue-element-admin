import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 路由表：初始时所拥有的路由表
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加路由
     * @param {*} state
     * @param {*} newRoutes
     */
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限数据筛选路由
     * @param {*} context
     * @param {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      // 筛选之后，获取到的需要通过 addRoute 进行添加的路由表
      const routes = []
      menus.forEach((key) => {
        // 能够匹配到的路由表加入到routes中去
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 所有不匹配的路由，全部进入 404 的路由配置
      // 注意：该配置必须要在所有路由指定之后
      routes.push({
        // 404
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)

      return routes
    }
  }
}
