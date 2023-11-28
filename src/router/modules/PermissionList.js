import layout from '@/layout'

export default {
  // 用户 ===> 员工管理列表
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      name: 'userPermission',
      component: () => import('@/views/permission-list/index.vue'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
