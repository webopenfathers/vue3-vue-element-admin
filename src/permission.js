import router from '@/router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫---用户登录权限
 * @param {*} to 要到那里去
 * @param {*} from 从哪里来
 * @param {*} next 是否要去?
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1.用户已登陆，则不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )

        // 循环添加动态路由
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })

        // 添加完动态路由之后，需要进行一次主动的跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 2.用户未登录，只允许进入 login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
