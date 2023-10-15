import i18n from '@/i18n'
// 处理 sidebar左侧菜单 与 面包屑 区域的国际化
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
