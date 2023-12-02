import Sortable from 'sortablejs'
import { ref } from 'vue'

export const tableRef = ref(null)

export const initSortable = () => {
  const el = tableRef.value.$el.querySelector(
    '.el-table__body-wrapper > table > tbody'
  )
  // 参数一：要拖拽的元素
  // 参数二：配置对象
  Sortable.create(el, {
    // 拖拽时生成的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    onEnd() {}
  })
}
