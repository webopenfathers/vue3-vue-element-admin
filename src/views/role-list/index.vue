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
        <el-table-column
          :label="$t('msg.role.action')"
          width="200"
          v-slot="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission v-model="visible" :roleId="selectRoleId" />
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}

watchSwitchLang(getRoleList)

const visible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}

watch(visible, (val) => {
  if (!val) selectRoleId.value = ''
})
</script>

<style lang="scss" scoped></style>
