<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" :class="{ selected: isSelected }">
      <p class="title">
        {{ data.title }}
      </p>
      <!-- 今日回款 -->
      <div class="desc">
        <span>{{ $t('msg.chart.tadayReceivable') }}</span>
        <p class="profit">
          &yen; {{ data.receivable }}
          <span class="unit">({{ $t('msg.chart.unit') }})</span>
        </p>
      </div>
      <!-- 今日结余 -->
      <div class="desc">
        <span>{{ $t('msg.chart.tadayBalance') }}</span>
        <p :class="data.balance > 0 ? 'profit' : 'loss'">
          &yen; {{ data.balance }}
          <span class="unit">({{ $t('msg.chart.unit') }})</span>
        </p>
      </div>
    </div></el-card
  >
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  data: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean
  }
})
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  border-radius: 5px;
  background-color: #f2f3f9;
  cursor: pointer;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 12px;
    margin-top: 6px;
    color: #999;
    display: flex;
    justify-content: space-between;

    .unit {
      color: #999;
    }

    .profit {
      color: #649840;
    }

    .loss {
      color: #b65b59;
    }
  }
}

.selected {
  border-left: 6px solid #5172e9;
  background-color: #fff;
}
</style>
