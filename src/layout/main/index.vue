<template>
  <!-- 过渡动效 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--   渲染layout一级路由的子路由   -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'Main',
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: rotate(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
