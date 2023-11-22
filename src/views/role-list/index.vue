<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="title"
          :label="$t('msg.role.name')"
        ></el-table-column>
        <el-table-column
          prop="describe"
          :label="$t('msg.role.desc')"
        ></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="200">
          <el-button type="primary" size="mini">
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}

watchSwitchLang(getRoleList)
</script>

<style lang="scss" scoped></style>
