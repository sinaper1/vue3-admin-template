<template>
  <div class="layout_container">
    <!--  左侧菜单  -->
    <div class="layout_slider" :class="{ fold: !!layoutSettingStore.fold }">
      <Logo></Logo>
      <!--展示左侧菜单-->
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :router="true"
          :default-active="$route.path"
          :collapse="layoutSettingStore.fold"
        >
          <!--动态生成路由-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--  顶部导航  -->
    <div class="layout_tabbar" :class="{ fold: !!layoutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!--  内容展示区域  -->
    <div class="layout_main" :class="{ fold: !!layoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
//引入左侧菜单的logo组件
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Tabbar from './tabbar/index.vue';
import Main from './main/index.vue';
import useUserStore from '@/store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting';
let userStore = useUserStore();
//获取layout配置
let layoutSettingStore = useLayoutSettingStore();
//获取路由对象
let $route = useRoute();
</script>
<script lang="ts">
export default {
  name: 'Layout',
};
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    color: #ffffff;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    //&.fold {
    //  width: $base-menu-min-width;
    //}
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    //right: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
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
    background-color: #95d475;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
