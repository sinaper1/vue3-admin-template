<template>
  <div class="layout_container">
    <!--  左侧菜单  -->
    <div class="layout_slider">
      <Logo></Logo>
      <!--展示左侧菜单-->
      <el-scrollbar class="scrollbar">
        <el-menu
            background-color="#001529"
            text-color="#fff"
            :router="false"
        >
          <!--动态生成路由-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--  顶部导航  -->
    <div class="layout_tabbar">2</div>
    <!--  内容展示区域  -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单的logo组件
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    .scrollbar{
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu{
        border-right: none;
      }
    }
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
    background-color: #95d475;
  }
}
</style>
