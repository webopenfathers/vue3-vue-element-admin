import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'

// 分别对应5个页面
import UserManage from './modules/UserManage'
import RoleList from './modules/RoleList'
import PermissionList from './modules/PermissionList'
import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'
import store from '@/store'

/**
 * 定义 路由表 对应 menu 菜单规则
 * 对于单个路由规则而言（循环）：
   一：如果meta && meta.title && meta.icon ：则显示在 menu 菜单中(其中 title 为显示的内容，icon 为显示的图标)
   1. 如果存在 children ：则以 el-sub-menu（子菜单） 展示
   2. 否则：则以 el-menu-item（菜单项） 展示

   二：否则：不显示在 menu 菜单中
 */

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate
]

console.log(privateRoutes)
/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: () =>
          import(/* webpackChunkName:"chart" */ '@/views/chart/index.vue'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    // menus: ["userManage","roleList",...]
    const menus = store.getters.userInfo.permission.menus
    console.log(menus)
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
