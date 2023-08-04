<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
//接收父组件传递的参数
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  //图标名字
  name: String,
  //图标颜色
  color: {
    type: String,
    default: '',
  },
  //  图标宽度
  width: {
    type: String,
    default: '16px',
  },
  //  高度
  height: {
    type: String,
    default: '16px',
  },
});
</script>

<style scoped></style>
