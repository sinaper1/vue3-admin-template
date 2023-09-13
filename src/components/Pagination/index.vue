<!--表格分页器-->
<script setup lang="ts">
// import { ref } from 'vue';
// const currentPage = ref<number>(1);
// const pageSize = ref<number>(10);
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
// 每页的条数变化
// const handleSizeChange = () => {
//   handleCurrentChange();
// };
// // 页数变化
// const handleCurrentChange = async (pager: number = 1) => {
//   currentPage.value = pager;
//   emit('handleTableChange', currentPage.value, pageSize.value);
// };
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
