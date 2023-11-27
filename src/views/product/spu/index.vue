<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import SpuForm from '@/views/product/spu/spuForm.vue';
import SkuForm from '@/views/product/spu/skuForm.vue';
import { reqDelSpu, reqGetSkuInfo } from '@/api/product/spu';
import useAttrStore from '@/store/modules/product/attr';
import useSpuStore from '@/store/modules/product/spu';
import { reqGetTrademarkList } from '@/api/product/trademark';
import type { SpuObj, SkuInfoData, SkuObjList } from '@/api/product/spu/type';
const attrStore = useAttrStore();
const spuStore = useSpuStore();
const scene = ref<number>(0); //0:显示已有spu,1:添加或修改spu,2:添加sku结构
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
let skuInfo = ref<SkuObjList>([]);
const dialogVisible = ref<boolean>(false);
// 获取子组件实例的spuForm
let spuRef = ref<any>();
// 获取组件实例的skuForm
let skuRef = ref<any>();
onMounted(() => {
  // 重新加载页面需清空原有的数据
  attrStore.AttrInfoData = [];
  getCategory1();
  reqGetTrademarkList();
});
onBeforeUnmount(() => {
  // 重置仓库数据
  attrStore.$reset();
  spuStore.$reset();
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
const handleEdit = (row: SpuObj) => {
  scene.value = 1;
  // 调用子组件的实例方法，获取完整的已有的SPU数据
  spuRef.value.initHasSpuData(row);
};
const handleCancelEdit = () => {
  scene.value = 0;
};
const handleOk = async (obj: any) => {
  // update:判断是否是编辑，编辑则保留在当前页，添加则返回第一页
  const { update } = obj;
  await refresh(update ? currentPage.value : 1);
  handleCancelEdit();
};
const handleAdd = (row: SpuObj) => {
  // 添加SKU，切换为场景2
  scene.value = 2;
  skuRef.value.initHasSkuData(row);
};
// 查看SPU列表
const handleView = async (id: number | string) => {
  const data: SkuInfoData = await reqGetSkuInfo(id);
  if (data.code === 200) {
    skuInfo.value = [...data.data];
    dialogVisible.value = true;
  }
};
const handleDelete = async (id: number | string) => {
  const result = await reqDelSpu(id);
  if (result.code === 200) {
    await refresh(
      spuStore.records.length > 1 ? currentPage.value : currentPage.value - 1,
    );
    ElMessage.success('删除成功！');
  } else {
    ElMessage.error('删除失败！');
  }
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  refresh();
};

const refresh = async (pager = 1) => {
  currentPage.value = pager;
  await spuStore.getSpuData(currentPage.value, pageSize.value, attrStore.c3Id);
};

const handleClose = () => {
  dialogVisible.value = false;
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
          :visible="scene !== 0"
          @handleCategory1ed="handleCategory1"
          @handleCategory2ed="handleCategory2"
          @handleCategory3ed="handleCategory3"
        />
        <el-button
          type="primary"
          @click="handleSearch"
          :disabled="!attrStore.c3Id || scene !== 0"
        >
          搜索
        </el-button>
      </div>
    </el-card>
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          icon="Plus"
          type="primary"
          :disabled="!attrStore.c3Id"
          @click="handleEdit"
        >
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0" border :data="spuStore.records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="SPU名称"
            align="center"
            prop="spuName"
          ></el-table-column>
          <el-table-column
            label="SPU描述"
            align="center"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作" align="center">
            <template #default="scope">
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                @click="handleAdd(scope.row)"
                title="添加SKU"
              ></el-button>
              <el-button
                type="primary"
                icon="Edit"
                size="small"
                @click="handleEdit(scope.row)"
                title="修改SPU"
              ></el-button>
              <el-button
                type="primary"
                icon="View"
                size="small"
                @click="handleView(scope.row.id)"
                title="查看SPU列表"
              ></el-button>
              <el-popconfirm
                title="确认删除这条数据？"
                @confirm="handleDelete(scope.row.id)"
                width="200"
              >
                <template #reference>
                  <el-button
                    size="small"
                    type="danger"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--分页器-->
        <Pagination
          :currentPage="currentPage"
          :pageSize="pageSize"
          :total="spuStore.total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="refresh"
        />
      </div>
      <SpuForm
        ref="spuRef"
        v-show="scene === 1"
        @handleCancel="handleCancelEdit"
        @handleOk="handleOk"
      />
      <SkuForm
        ref="skuRef"
        v-show="scene === 2"
        @handleCancel="handleCancelEdit"
        @handleOk="handleOk"
      />
      <!--SPU列表数据-->
      <el-dialog
        v-model="dialogVisible"
        title="SKU列表"
        width="30%"
        :before-close="handleClose"
      >
        <el-table border :data="skuInfo">
          <el-table-column label="sku名字" align="center" prop="skuName" />
          <el-table-column
            label="sku价格"
            width="100"
            align="center"
            prop="price"
          />
          <el-table-column
            label="sku重量"
            width="100"
            align="center"
            prop="weight"
          />
          <el-table-column label="sku图片" align="center" width="100">
            <template #default="scope">
              <el-image
                fit="fill"
                :src="scope.row.skuDefaultImg"
                :alt="scope.row.skuName"
              ></el-image>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
