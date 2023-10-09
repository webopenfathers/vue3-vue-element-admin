/**
 * 存储数据
 */
export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = JSON.parse(window.localStorage.getItem(key))
  return data
}

/**
 * 删除指定数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
