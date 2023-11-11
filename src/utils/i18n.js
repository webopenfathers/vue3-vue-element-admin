import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'
// 处理 sidebar左侧菜单 与 面包屑 区域的国际化
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 * 监听语言变化,同时执行 cb,cb可以时多个参数
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      console.log('我变化了')
      cbs.forEach((cb) => cb(store.getters.language))
    },
    {
      immediate: true
    }
  )
}
