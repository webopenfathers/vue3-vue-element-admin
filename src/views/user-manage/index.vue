<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary">{{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success">{{ $t('msg.excel.exportExcel') }}</el-button>
      </div>
    </el-card>
    <!-- table -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="#" type="index"></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <!-- 手机号 -->
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.mobile')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <!-- 时间 -->
        <!-- 操作 -->
      </el-table>
      <el-pagination></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { getUserManageList } from '@/api/user-manage'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

getListData()
watchSwitchLang(getListData)
</script>

<style lang="scss" scoped></style>
