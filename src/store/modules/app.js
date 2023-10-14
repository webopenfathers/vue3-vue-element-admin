import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 修改语言
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  }
}
