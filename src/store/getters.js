import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
import { generateColor } from '@/utils/theme'

// 快捷访问
const getters = {
  token: (state) => state.user.token,
  /**
   *
   * @returns true 表示用户信息已存在
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // css 变量
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColor(getItem(MAIN_COLOR))
  }),
  // sidebar 开关
  sidebarOpened: (state) => state.app.sidebarOpened,
  // 国际化
  language: (state) => state.app.language,
  // 主题色
  mainColor: (state) => state.theme.mainColor,
  // tags
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
