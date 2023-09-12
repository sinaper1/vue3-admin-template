<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import useAttrStore from '@/store/modules/product/attr';
import useSpuStore from '@/store/modules/product/spu';
const attrStore = useAttrStore();
const spuStore = useSpuStore();
// visible为true现在添加或修改卡片，否则显示table数据卡片
const visible = ref<boolean>(false);
// loading状态
const pending = ref<boolean>(false);
const currentPage = ref<number>(1);
const total = ref<number>(0);
const pageSize = ref<number>(10);
onMounted(() => {
  // 重新加载页面需清空原有的数据
  attrStore.AttrInfoData = [];
  getCategory1();
});
onBeforeUnmount(() => {
  // 重置仓库数据
  attrStore.$reset();
});
const getCategory1 = async () => {
  await attrStore.useCategory1();
};
const handleCategory1 = async (category1Id: number) => {
  attrStore.c1Id = category1Id;
  attrStore.c2Id = '';
  attrStore.c3Id = '';
  attrStore.category3Data = [];
  await attrStore.useCategory2();
};
const handleCategory2 = async (category2Id: number) => {
  attrStore.c2Id = category2Id;
  attrStore.c3Id = '';
  await attrStore.useCategory3();
};
const handleCategory3 = async (category3Id: number) => {
  attrStore.c3Id = category3Id;
};
const handleSearch = async () => {
  // 查询列表数据
  if (attrStore.c3Id) {
    await refresh();
    // await attrStore.getAttrInfo();
  } else {
    ElMessage.error('请选择三级分类！');
  }
};
const handleEdit = () => {
  visible.value = true;
};
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  refresh();
};
const handleCurrentChange = (val: number) => {
  refresh(val);
};

const refresh = async (pager = 1) => {
  pending.value = true;
  currentPage.value = pager;
  await spuStore.getSpuData(currentPage.value, pageSize.value, attrStore.c3Id);
  pending.value = false;
};
</script>

<template>
  <div>
    <el-card>
      <div style="display: flex">
        <ThreeLevelSelect
          :title1="['一级分类', '二级分类', '二级分类']"
          :category1Data="attrStore.category1Data"
          :category2Data="attrStore.category2Data"
          :category3Data="attrStore.category3Data"
          :visible="visible"
          @handleCategory1ed="handleCategory1"
          @handleCategory2ed="handleCategory2"
          @handleCategory3ed="handleCategory3"
        />
        <el-button
          type="primary"
          @click="handleSearch"
          :disabled="!attrStore.c3Id || visible"
        >
          搜索
        </el-button>
      </div>
    </el-card>
    <el-card style="margin: 10px 0">
      <div v-show="!visible">
        <el-button
          icon="Plus"
          type="primary"
          :disabled="!attrStore.c3Id"
          @click="handleEdit"
        >
          添加SPU
        </el-button>
        <el-table
          style="margin: 10px 0"
          border
          v-loading="pending"
          element-loading-text="加载中..."
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="SPU名称" align="center"></el-table-column>
          <el-table-column label="SPU描述" align="center"></el-table-column>
          <el-table-column label="SPU操作" align="center"></el-table-column>
        </el-table>
        <!--分页器-->
        <Pagination
          :total="total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
