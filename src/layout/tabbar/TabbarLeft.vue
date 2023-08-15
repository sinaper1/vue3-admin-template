<template>
  <!--   顶部左侧静态   -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="!item.meta.hidden"
      :to="{ path: item.path }"
    >
      <el-icon style="margin: 0 5px 0 0">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
//用于展开与收起的控制，获取layout配置相关的仓库
import useLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
let $route = useRoute();
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};
const handle = () => {
  console.log($route, '--route---');
};
</script>
<script lang="ts">
export default {
  name: 'TabbarLeft',
};
</script>

<style scoped lang="scss"></style>
