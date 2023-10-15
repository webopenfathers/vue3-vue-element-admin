import { createI18n } from 'vue-i18n'
// 自定义语言包
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'

// 1.创建 message 数据源
const messages = {
  en: {
    msg: {
      // 自定义语言包
      ...enLocale
    }
  },
  zh: {
    msg: {
      // 自定义语言包
      ...zhLocale
    }
  }
}

// 2.获取 locale 语言变量
function getLanguage() {
  return store && store.getters && store.getters.language
}

// 3.初始化 i18n 实例
const i18n = createI18n({
  // 使用 composition API
  legacy: false,
  // 全局使用 t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
