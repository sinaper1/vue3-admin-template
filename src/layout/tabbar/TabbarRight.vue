<template>
  <el-button type="primary" icon="Refresh" size="small" circle />
  <el-button type="primary" icon="FullScreen" size="small" circle />
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

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'TabbarRight',
};
</script>

<style scoped lang="scss"></style>
