import variables from '@/styles/variables.module.scss'

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
  cssVar: (state) => variables,
  // sidebar 开关
  sidebarOpened: (state) => state.app.sidebarOpened,
  // 国际化
  language: (state) => state.app.language
}

export default getters
