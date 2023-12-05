import Sortable from 'sortablejs'
import { ref } from 'vue'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelector('.el-table__body > tbody')
  // 参数一：要拖拽的元素
  // 参数二：配置对象
  Sortable.create(el, {
    // 拖拽时生成的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      console.log(tableData.value[oldIndex].ranking, '开始')
      console.log(tableData.value[newIndex].ranking, '结束')
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })

      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))

      // 直接重新获取数据无法刷新 table!!
      tableData.value = []

      // 重新获取数据
      cb && cb()
    }
  })
}
