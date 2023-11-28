import layout from '@/layout'

export default {
  // 用户 ===> 员工管理列表
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      name: 'userRole',
      component: () => import('@/views/role-list/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
