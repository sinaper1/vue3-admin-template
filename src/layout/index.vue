<template>
  <div class="layout_container">
    <!--  左侧菜单  -->
    <div class="layout_slider">
      <Logo></Logo>
    </div>
    <!--  顶部导航  -->
    <div class="layout_tabbar">2</div>
    <!--  内容展示区域  -->
    <div class="layout_main">
      <p style="height: 1000px; background-color: #337ecc">段落</p>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单的logo组件
import Logo from './logo/index.vue';
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    //right: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    //right: 0;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
  }
}
</style>
