<template>
  <el-card class="container" :body-style="{ padding: 0 }">
    <el-calendar v-model="currentDate" class="calendar">
      <!-- 具名插槽 -->
      <template #date-cell="{ data }">
        <!-- 展示的内容 -->
        <p
          :class="[
            data.isSelected ? 'is-selected' : '',
            calendarItemBgClass(data.day)
          ]"
        >
          <!-- 显示的内容 -->
          {{ data.day.split('-').slice(2).join('-') }}
          <br />
          <!-- 当日金额 -->
          <span class="amount" v-if="getTadayAmount(data.day)">{{
            getTadayAmount(data.day)
          }}</span>
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>
<script setup>
import { ref, watch } from 'vue'
import { getChartCalendar } from '@/api/chart'
import emitter from '@/utils/eventHub'

const currentDate = ref(new Date())

// 获取数据
const calendarListData = ref([])
const getCalendarListData = async () => {
  const { result } = await getChartCalendar()
  calendarListData.value = result
}
getCalendarListData()

// 收益缓存数据
// key：日期
// value：金额
const dateAmountVo = ref({})

// 返回指定日期的收益数据
const getTadayAmount = (date) => {
  // 读取缓存
  if (dateAmountVo.value[date]) return dateAmountVo.value[date]

  const tadayData = calendarListData.value.find((item) => item.date === date)
  if (!tadayData) return 0

  // 当日金额
  const tadayAmount = tadayData.amount
  // 缓存数据
  dateAmountVo.value[date] = tadayAmount

  return tadayAmount
}

/**
 * 返回日历背景
 */
const calendarItemBgClass = (day) => {
  const amount = getTadayAmount(day)
  if (amount > 0) {
    return 'profit'
  } else if (amount < 0) {
    return 'loss'
  }
  return ''
}

/**
 * 监听日期的变化
 */
watch(currentDate, (val) => {
  emitter.emit('calendarChange', val)
})
</script>

<style lang="scss" scoped>
.container {
  height: 460px;
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
