import layout from '@/layout'

export default {
  // 用户 ===> 员工管理列表
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    // 员工管理列表
    {
      path: '/user/manage',
      component: () => import('@/views/user-manage/index.vue'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    // 查看员工详情
    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index.vue'),
      // 将props传递给路由组件
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    // Excel导入员工
    {
      path: '/user/import',
      name: 'import',
      component: () => import('@/views/import/index.vue'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
