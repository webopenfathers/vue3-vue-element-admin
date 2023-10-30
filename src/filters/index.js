import dayjs from 'dayjs'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
  // 可以被转成数字
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
