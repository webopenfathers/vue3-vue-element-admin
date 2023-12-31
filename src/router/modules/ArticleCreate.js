import layout from '@/layout'

export default {
  // 文章 ===> 员工管理列表
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleCreate',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      name: 'articleCreate',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      name: 'articleEditor',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
