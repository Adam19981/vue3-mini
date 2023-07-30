<template>
  <u-navbar title="首页"></u-navbar>

  <PageLayout>
    <Turntable height="300px" width="300px" :prize-list="prizeList"></Turntable
  ></PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@components/pageLayout/index.vue'
import Turntable from '@components/turntable/index.vue'
import { ref } from 'vue'

const prizeList = ref([
  {
    id: 'xiaomi',
    prizeName: '小米手机',
    prizeImg:
      'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png'
  },
  {
    id: 'blue',
    prizeColor: 'rgb(251, 219, 216)',
    prizeName: '蓝牙耳机',
    prizeImg:
      'https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg'
  },
  {
    id: 'apple',
    prizeName: 'apple watch',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png'
  },
  {
    id: 'fruit',
    prizeColor: 'rgba(246, 142, 46, 0.5)',
    prizeName: '迪士尼苹果',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/108308/11/8890/237603/5e6f157eE489cccf1/26e0437cfd93b9c8.png'
  },
  {
    id: 'fish',
    prizeName: '海鲜套餐',
    prizeImg:
      'https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png'
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png'
  }
])
</script>

<style scoped lang="scss"></style>
