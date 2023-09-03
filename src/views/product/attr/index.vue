<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqDeleteAttr } from '@/api/product/attr';
import useAttrStore from '@/store/modules/product/attr';
import { ElMessage } from 'element-plus';
let attrStore = useAttrStore();
// visible为true现在添加或修改卡片，否则显示table数据卡片
const visible = ref<boolean>(false);
onMounted(() => {
  // 重新加载页面需清空原有的数据
  attrStore.AttrInfoData = [];
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
  if (attrStore.c3Id) {
    await attrStore.getAttrInfo();
  } else {
    ElMessage.error('请选择三级分类！');
  }
};
const handleDelete = async (id: number) => {
  const result = await reqDeleteAttr(id);
  if (result.code === 200) {
    await handleSearch();
    ElMessage.success('删除属性成功！');
  } else {
    ElMessage.error('删除属性失败！');
  }
};
const handleEdit = (id?: number) => {
  visible.value = true;
};
const handleAddAttr = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
const handleSubmit = () => {
  console.log(121212);
}
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
          添加属性
        </el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrStore.AttrInfoData"
          :v-loading="attrStore.pending"
          element-loading-text="加载中..."
        >
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
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="(item, i) in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template #default="{ row, $index }">
              <el-button
                type="primary"
                icon="Edit"
                size="small"
                @click="handleEdit(row.id)"
              ></el-button>
              <el-popconfirm
                title="确认删除这条数据？"
                @confirm="handleDelete(row.id)"
                width="200"
              >
                <template #reference>
                  <el-button
                    size="small"
                    type="danger"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="visible">
        <!--     添加属性与修改属性的结构   -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" @click="handleAddAttr">
          添加属性值
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
        <el-table border style="margin: 10px">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center"></el-table-column>
        </el-table>
        <el-button type="primary" @click="handleSubmit">
          保存
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
