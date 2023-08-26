<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqHasTrademark, reqDelTrademark } from '@/api/product/trademark';
import type { Records } from '@/api/product/trademark/type';
import { TrademarkResponseData } from '@/api/product/trademark/type';

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const small = ref<boolean>(false);
const background = ref<boolean>(true);
const total = ref<number>(0);
// 表格数据
const dataSource = ref<Records>([]);
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getHasTrademark();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getHasTrademark();
};
// 查询列表数据
const getHasTrademark = async () => {
  let result: TrademarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  );
  if (result.code === 200) {
    total.value = result.data.total;
    dataSource.value = result.data.records;
  }
};
const handleEdit = async (index, row) => {
  console.log(index, row, '---row---');
};
const handleDelete = async (id: number) => {
  reqDelTrademark(id);
  console.log(id, '---index---');
};
// 组件挂载完毕钩子函数
onMounted(() => {
  getHasTrademark();
});
</script>

<template>
  <el-card class="box-card">
    <div>
      <el-button type="primary" icon="Plus">添加品牌</el-button>
      <el-table :data="dataSource" style="margin: 10px 0" border>
        <el-table-column label="序号" width="80" align="center" type="index" />
        <el-table-column label="品牌名称" align="center" prop="tmName" />
        <el-table-column label="品牌LOGO" align="center">
          <template #default="scope">
            <el-image
              :src="scope.row.logoUrl"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
              icon="Edit"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
              icon="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :small="small"
        :background="background"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<style scoped lang="scss"></style>
