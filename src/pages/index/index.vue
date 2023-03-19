<template>
  <u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar>

  <PageLayout ref="pageEl"> </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@components/pageLayout.vue'
import { onReady } from '@dcloudio/uni-app'

const pageEl = ref()

onReady(() => {
  console.log(pageEl.value)
})
</script>

<style scoped></style>
