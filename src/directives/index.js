import print from 'vue3-print-nb'
import permission from './permission'

export default (app) => {
  app.use(print)
  // 注册指令
  app.directive('permission', permission)
}
