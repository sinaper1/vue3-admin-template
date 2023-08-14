<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <tabbar-left></tabbar-left>
    </div>
    <div class="tabbar-right">
      <tabbar-right></tabbar-right>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabbarLeft from '@/layout/tabbar/TabbarLeft.vue';
import TabbarRight from '@/layout/tabbar/TabbarRight.vue';
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
};
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid lightgray;
  background-image: linear-gradient(
    to right,
    rgb(232, 223, 223),
    rgb(201, 178, 178),
    rgb(197, 165, 165)
  );
  .tabbar-left {
    display: flex;
    margin-left: 20px;
  }
  .tabbar-right {
    display: flex;
    margin-right: 20px;
  }
}
</style>
