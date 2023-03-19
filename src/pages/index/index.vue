<template>
  <u-navbar title="个人中心" :autoBack="true"> </u-navbar>
  <div :style="{ height: `calc(100vh - ${clipHeight}px)` }"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clipHeight = ref<number>(0)

const props = defineProps({
  hasNavBar: Boolean,
  customTabBar: {
    type: Boolean,
    default: true
  },
  tabBarHeight: {
    type: Number,
    default: 44
  }
})

function getClipHeight() {
  let clip = 0
  const { safeAreaInsets } = uni.getWindowInfo()

  if (props.customTabBar) {
    clip += safeAreaInsets.top
    clip += 47
  }
  if (safeAreaInsets.bottom) {
    clip += safeAreaInsets.bottom
  }
  return clip
}

clipHeight.value = getClipHeight()
</script>

<style scoped></style>
