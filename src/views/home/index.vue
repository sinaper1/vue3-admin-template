<template>
  <div>
    <h1>home页{{ userStore.userName }}</h1>
  </div>
</template>

<script setup lang="ts">
//引入组合式API函数之生命周期函数
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
// 首页挂载完毕发送请求获取用户信息
onMounted(() => {
  userStore.useInfo();
});
</script>

<style scoped></style>
