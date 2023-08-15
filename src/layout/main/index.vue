<template>
  <!-- 过渡动效 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--   渲染layout一级路由的子路由   -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import useLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
//控制当前组件是否销毁重建
let flag = ref(true);
//监听是否点击刷新按钮
watch(
  () => layoutSettingStore.refresh,
  () => {
    //点击刷新按钮组件销毁
    flag.value = false;
    //销毁完毕，再次创建组件，刷新页面
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
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
