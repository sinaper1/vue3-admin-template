<template>
  <!--   顶部左侧静态   -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
//用于展开与收起的控制，获取layout配置相关的仓库
import useLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};
</script>
<script lang="ts">
export default {
  name: 'TabbarLeft',
};
</script>

<style scoped lang="scss"></style>
