<script setup lang="ts">
import { onMounted } from 'vue';
import useAttrStore from '@/store/modules/product/attr';
let attrStore = useAttrStore();

onMounted(() => {
  getCategory1();
});
const getCategory1 = async () => {
  await attrStore.useCategory1();
};
const handleCategory1 = async (category1Id: number) => {
  // console.log(category1Id, '---category1Id---');
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
  await attrStore.getAttrInfo();
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
          :value="attrStore.c1Id"
          :value2="attrStore.c2Id"
          :value3="attrStore.c3Id"
          @handleCategory1ed="handleCategory1"
          @handleCategory2ed="handleCategory2"
          @handleCategory3ed="handleCategory3"
        />
        <el-button
          type="primary"
          @click="handleSearch"
          :disabled="!attrStore.c3Id"
        >
          搜索
        </el-button>
      </div>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button icon="Plus" type="primary" :disabled="!attrStore.c3Id">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
