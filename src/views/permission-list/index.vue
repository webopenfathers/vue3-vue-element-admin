<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%"
        border
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
        ></el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

/**
 * 权限分级：
 * 1.一级权限为页面权限
 * permissionMark 对应 路由名称
 * 2.二级权限为功能权限
 * permissionMark 对应 功能权限表
 */
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}

watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
