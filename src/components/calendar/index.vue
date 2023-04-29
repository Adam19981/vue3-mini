<template>
  <div
    class="calendar-main"
    id="calendar"
    :class="{ 'calendar-main-active': modelValue }"
  >
    <div class="calendar-main-week" :class="{ 'calendar-hidden': modelValue }">
      <div
        v-for="item in weekArray"
        class="calendar-main-week-li"
        @click="handleClickDate(item)"
        :key="item.date"
        :class="{
          'calendar-main-week-li-active': item.date === activeDate
        }"
      >
        <div>{{ item.date }}</div>
        <div>{{ item.label }}</div>
      </div>
    </div>

    <div class="calendar-main-month">
      <div class="calendar-main-month-thead">
        <div
          class="calendar-main-month-thead-li"
          v-for="item in weeks"
          :key="item"
        >
          {{ item }}
        </div>
      </div>

      <div class="calendar-main-month-tbody">
        <div
          class="calendar-main-month-tbody-li"
          v-for="(item, index) in monthArray"
          :key="index"
          @click="handleClickDate(item)"
          :class="{
            'calendar-main-week-li-active': item.date === activeDate
          }"
        >
          <div>{{ item.date ? item.date : '' }}</div>
        </div>
      </div>
    </div>

    <div class="calendar-main-slider" @click="handleClick"></div>
  </div>

  <div
    v-show="modelValue"
    class="calendar-mask"
    @click="emit('update:modelValue', false)"
  ></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SDate } from '@/utils'
import { getNowDateInfo } from '@/utils/date'

defineProps({
  modelValue: Boolean
})

const weeks = ['一', '二', '三', '四', '五', '六', '日']

const emit = defineEmits(['update:modelValue', 'clickDate'])

const activeDate = ref<number>(new Date().getDate())

const dateInfo = ref<SDate.DateInfo>(getNowDateInfo())

const weekArray = ref<SDate.CalendarItem[]>([])

const monthArray = ref<SDate.CalendarItem[]>([])

weekArray.value = SDate.getWeek(dateInfo.value)

monthArray.value = SDate.getMonth(dateInfo.value)

function handleClickDate(item: SDate.CalendarItem) {
  activeDate.value = item.date
  emit('clickDate', item)
}

function handleClick() {
  emit('update:modelValue', true)
}
</script>

<style scoped lang="scss">
.calendar-main {
  position: relative;
  padding: 16rpx 10rpx;
  transition: all 0.5s;
  overflow: hidden;
  background: #fff;
  height: 156rpx;

  &-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    &-li {
      padding: 22rpx 10rpx;
      border-radius: 8rpx;
      text-align: center;
    }

    &-li-active {
      color: #fff;
      background: #0271fa;
    }
  }

  &-month {
    &-thead {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      &-li {
        padding: 22rpx 10rpx;
        border-radius: 8rpx;
        text-align: center;
      }
    }
    &-tbody {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      /* 高度平均分成3份 */
      grid-template-rows: repeat(6, 1fr);
      &-li {
        padding: 22rpx 10rpx;
        border-radius: 8rpx;
        text-align: center;
      }
    }
  }

  &-slider {
    position: absolute;
    bottom: 0rpx;
    left: 50%;
    height: 20rpx;
    width: 80rpx;
    transform: translate(-50%, 0);

    &:after {
      content: '';
      width: 100%;
      height: 4rpx;
      background: #999;
      position: absolute;
      bottom: 10rpx;
    }
  }
}

.calendar-main-active {
  height: 800rpx;
}
.calendar-hidden {
  display: none;
}
.calendar-mask {
  transition: 0.5s;
  width: 100%;
  height: calc(100% - 800rpx);
  background: rgba(0, 0, 0, 0.1);
}
</style>
