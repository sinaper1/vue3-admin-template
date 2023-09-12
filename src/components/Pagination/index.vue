<!--表格分页器-->
<script setup lang="ts">
import { ref } from 'vue';
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
defineProps({
  total: Number,
  disabled: Boolean,
  background: Boolean,
  small: Boolean,
});
// 引入父组件传过来的事件
const emit = defineEmits(['handleSizeChange', 'handleCurrentChange']);
</script>

<template>
  <div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="(val) => emit('handleSizeChange', val)"
      @current-change="(val) => emit('handleCurrentChange', val)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
