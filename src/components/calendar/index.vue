<template>
  <div
    class="calendar-main"
    id="calendar"
    :class="{ 'calendar-month-active': modelValue }"
  >
    <div class="calendar-main-week" :class="{ 'calendar-hidden': modelValue }">
      <div
        v-for="item in weekArray"
        class="calendar-main-week-li"
        @click="handleClickDate(item, 'week')"
        :key="item.date"
        :class="{
          'calendar-main-week-li-active': item.timeStamp === activeDate
        }"
      >
        <div>{{ item.date }}</div>
        <div>{{ item.label }}</div>
      </div>
    </div>

    <div class="calendar-main-month">
      <div class="calendar-main-month-title">
        {{ dateInfo.year + '年' + dateInfo.month + '月' }}
        <div class="right-icon">
          <u-icon
            @click="handleSwitch('month', 'right')"
            name="arrow-right"
            style="margin-right: 20rpx"
          ></u-icon>
          <u-icon
            @click="handleSwitch('year', 'right')"
            name="arrow-right-double"
          ></u-icon>
        </div>
        <div class="left-icon">
          <u-icon
            @click="handleSwitch('year', 'left')"
            name="arrow-left-double"
          ></u-icon>
          <u-icon
            @click="handleSwitch('month', 'left')"
            style="margin-left: 20rpx"
            name="arrow-left"
          ></u-icon>
        </div>
      </div>
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
          @click="handleClickDate(item, 'month')"
          :class="{
            'calendar-main-week-li-active': item.timeStamp === activeDate
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

type IconType = 'year' | 'month'

type ClickType = 'week' | 'month'

type Direction = 'right' | 'left'

// const instance = getCurrentInstance() // 获取组件实例

defineProps({
  modelValue: Boolean
})

const weeks = ['一', '二', '三', '四', '五', '六', '日']

const emit = defineEmits(['update:modelValue', 'clickDate'])

const activeDate = ref<number>(SDate.getDateTimeStampZero())

const dateInfo = ref<SDate.DateInfo>(SDate.getNowDateInfo())

const weekArray = ref<SDate.CalendarItem[]>([])

const monthArray = ref<SDate.CalendarItem[]>([])

weekArray.value = SDate.getWeek(dateInfo.value)

monthArray.value = SDate.getMonth(dateInfo.value)

function handleClickDate(item: SDate.CalendarItem, type: ClickType) {
  if (!item.date) return
  activeDate.value = item.timeStamp
  if (type === 'month') {
    dateInfo.value = SDate.getNowDateInfo(item.timeStamp)
    weekArray.value = SDate.getWeek(dateInfo.value)
  }
  emit('clickDate', item)
}

function handleClick() {
  // const query = uni.createSelectorQuery().in(instance)
  // query
  //   .select('.calendar-main-month')
  //   .boundingClientRect((rect) => {
  //     // 获取到元素
  //     const { height } = rect
  //     calendarHeight.value = height! * 2
  //   })
  //   .exec()

  emit('update:modelValue', true)
}

function handleSwitch(type: IconType, direction: Direction) {
  const req = dateInfo.value
  if (direction === 'left') {
    if (type === 'year') {
      dateInfo.value.year--
    } else if (req.month === 1) {
      dateInfo.value.year--
      dateInfo.value.month = 12
    } else {
      dateInfo.value.month--
    }
  } else if (type === 'year') {
    dateInfo.value.year++
  } else if (req.month === 12) {
    dateInfo.value.year++
    dateInfo.value.month = 1
  } else {
    dateInfo.value.month++
  }
  dateInfo.value.date = `${req.year}-${req.month}-${req.day}`
  monthArray.value = SDate.getMonth(dateInfo.value)
}
</script>

<style scoped lang="scss">
.calendar-main {
  position: relative;
  padding: 16rpx 10rpx;
  transition: all 0.5s;
  overflow: hidden;
  background: #fff;
  height: 166rpx;

  &-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 20rpx;

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
    padding: 16rpx 10rpx;

    &-title {
      position: relative;
      text-align: center;
      margin-bottom: 20rpx;

      .right-icon {
        position: absolute;
        right: 0;
        bottom: 0;
      }

      .left-icon {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

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
.calendar-month-active {
  height: 680rpx;
}

.calendar-hidden {
  display: none;
}
.calendar-mask {
  transition: 0.5s;
  width: 100%;
  height: calc(100% - 680rpx);
  background: rgba(0, 0, 0, 0.1);
}
</style>
