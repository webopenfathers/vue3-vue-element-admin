<template>
  <el-card class="container" :body-style="{ padding: 0 }">
    <el-calendar v-model="currentDate" class="calendar">
      <!-- 具名插槽 -->
      <template #date-cell="{ data }">
        <!-- 展示的内容 -->
        <p :class="data.isSelected ? 'is-selected' : ''">
          <!-- 显示的内容 -->
          {{ data.day.split('-').slice(2).join('-') }}
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>
<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>
<style lang="scss" scoped>
.container {
  height: 443px;
  .calendar {
    ::v-deep .el-calendar__body {
      padding: 0 12px 12px;
      font-size: 14px;
    }

    ::v-deep .el-calendar-day {
      height: 66px !important;
      padding: 0 !important;

      p {
        height: 100%;
        padding: 8px;
      }
      // 金额样式
      .amount {
        font-size: 12px;
      }
      // 正收益
      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }
      // 负收益
      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>
