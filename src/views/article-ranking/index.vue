<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLable">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <!-- 发布时间 -->
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <!-- 操作 -->
          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { deleteArticle, getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { dynamicData, selectDynamicLable, tableColumns } from './dynamic/index'
// tableRef只要导入了，js文件就可以获取到这个dom
import { tableRef, initSortable } from './sortable'

// 数据相关
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

// 国际化调用
watchSwitchLang(getListData)
onActivated(getListData)

// 初始化sortable
onMounted(() => {
  initSortable(tableData, getListData)
})

// size 改变
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

// 页码改变
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// 点击查看
const router = useRouter()
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}

// 点击删除
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  )
    .then(async (res) => {
      await deleteArticle(row._id)
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      getListData()
    })
    .catch((err) => {
      return err
    })
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}

// 拖拽时的css样式
::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff;
  background-color: #304156;
}
</style>
