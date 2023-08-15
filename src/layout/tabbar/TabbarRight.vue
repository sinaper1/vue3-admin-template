<template>
  <el-button
    type="primary"
    icon="Refresh"
    size="small"
    circle
    @click="handleRefresh"
  />
  <el-button
    type="primary"
    icon="FullScreen"
    size="small"
    circle
    @click="handleFullScreen"
  />
  <el-button type="primary" icon="Setting" size="small" circle />
  <!--      <img src="../../../public/logo.png" alt="头像">-->
  <el-avatar
    size="small"
    src="../../../public/logo.png"
    alt="用户头像"
    style="margin: 0 10px"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
const handleRefresh = () => {
  //刷新按钮点击事件
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
const handleFullScreen = () => {
  //  全屏事件,谷歌浏览器
  //  判断当前是否处于全屏状态
  let fullScreen = document.fullscreenElement;
  if (!fullScreen) {
    //利用文档的根节点方法：requestFullscreen，实现全屏
    document.documentElement.requestFullscreen();
  } else {
    //退出全屏
    document.exitFullscreen();
  }
};
</script>
<script lang="ts">
export default {
  name: 'TabbarRight',
};
</script>

<style scoped lang="scss"></style>
