<!--表格分页器-->
<script setup lang="ts">
//引入父组件传过来的参数
defineProps({
  total: Number,
  currentPage: Number,
  pageSize: Number,
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
      :current-page="currentPage"
      :page-size="pageSize"
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
