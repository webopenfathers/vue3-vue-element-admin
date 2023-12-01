import dayjs from 'dayjs'

// 导入相对时间的插件
import rt from 'dayjs/plugin/relativeTime'
// 因为dayjs默认显示英文--所以导入中文语言包即可
import 'dayjs/locale/zh-cn'
import store from '@/store'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  // 可以被转成数字
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 相对时间
dayjs.extend(rt)
function relativeTime(val) {
  // 可以被转成数字
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
