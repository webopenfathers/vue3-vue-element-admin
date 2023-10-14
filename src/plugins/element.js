import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入 element-plus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
// 导入 element-plus 语言包
import store from '@/store'

export default (app) => {
  app.use(ElementPlus, {
    // 语言切换
    locale: store.getters.language === 'en' ? en : zhCn
  })
}
