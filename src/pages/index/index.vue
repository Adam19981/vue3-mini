<template>
  <u-navbar title="首页"></u-navbar>

  <PageLayout>
    <Calendar v-model="active"></Calendar>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@components/pageLayout/index.vue'
import Calendar from '@components/calendar/index.vue'
import { ref } from 'vue'

const active = ref<boolean>(false)
</script>

<style scoped></style>
