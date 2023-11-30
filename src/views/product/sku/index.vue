<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0" :data="skuInfo">
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="80"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="150"
          align="center"
          show-overflow-tooltip
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="150"
          align="center"
          prop="skuDesc"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="默认图片" width="100" align="center">
          <template #default="scope">
            <el-image
              fit="fill"
              :src="scope.row.skuDefaultImg"
              :alt="scope.row.skuName"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="重量(g)"
          width="100"
          align="center"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格(元)"
          width="100"
          align="center"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template #="{ row, index }">
            <el-button
              :type="row.isSale === 0 ? 'success' : 'info'"
              size="small"
              :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
              :title="row.isSale === 0 ? '上架SKU' : '下架SKU'"
              @click="handleSkuSale(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              title="编辑SKU"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="InfoFilled"
              title="SKU详情"
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
                  title="删除SKU"
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
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="refresh"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  reqCancelSaleSku,
  reqDeleteSku,
  reqGetSku,
  reqOnSaleSku,
} from '@/api/product/sku';
import { records, SkuResponseData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
import type { SkuObj } from '@/api/product/spu/type';

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
let total = ref<number>(0);
const skuInfo = ref<records>([]);
onMounted(() => {
  refresh();
});
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  refresh();
};

const refresh = async (pager = 1) => {
  currentPage.value = pager;
  const result: SkuResponseData = await reqGetSku(
    currentPage.value,
    pageSize.value,
  );
  if (result.code === 200) {
    skuInfo.value = result?.data?.records;
    total.value = result?.data?.total;
  }
};

const handleDelete = async (id: number | string) => {
  const result = await reqDeleteSku(id);
  if (result.code === 200) {
    await refresh(
      skuInfo.value.length > 1 ? currentPage.value : currentPage.value - 1,
    );
    ElMessage.success('删除成功！');
  } else {
    ElMessage.error('删除失败！');
  }
};

const handleSkuSale = async (data: SkuObj) => {
  // 商品上架与下架
  // isSale：1：商品已上架；0：商品已下架
  if (data.isSale) {
    const res = await reqCancelSaleSku(data.id);
    if (res.code === 200) {
      ElMessage.success('商品下架成功！');
      await refresh();
    } else {
      ElMessage.success('商品下架失败！');
    }
  } else {
    const res = await reqOnSaleSku(data.id);
    if (res.code === 200) {
      ElMessage.success('商品上架成功！');
      await refresh();
    } else {
      ElMessage.success('商品上架失败！');
    }
  }
};
</script>

<style scoped lang="scss"></style>
