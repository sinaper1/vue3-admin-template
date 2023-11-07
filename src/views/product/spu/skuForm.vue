<script setup lang="ts">
import { reactive, ref } from 'vue';
import useAttrStore from '@/store/modules/product/attr';
import {
  SaleAttrResponseData,
  SkuObj,
  SpuImage,
  SpuImageData,
  SpuImageResponseData,
  SpuObj,
  spuSaleAttrList,
} from '@/api/product/spu/type';
import {
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAddSku,
} from '@/api/product/spu';
import { ElMessage } from 'element-plus';

const attrStore = useAttrStore();

const emit = defineEmits(['handleCancel', 'handleOk']);
// 销售属性
const spuSaleAttr = ref<spuSaleAttrList>([]);
// 图片数据
const fileList = ref<SpuImageData>([]);
// 获取table组件实例
const table = ref<any>();
const initData: SkuObj = {
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuImageList: [],
  tmId: '',
  category3Id: '',
  spuId: '',
  skuDefaultImg: '',
};
let params = reactive<SkuObj>({
  ...initData,
});
const onCancel = () => {
  // 清空照片
  fileList.value = [];
  // 清空销售属性
  spuSaleAttr.value = [];
  // 重置params
  Object.assign(params, initData);
  emit('handleCancel');
};
const onSave = async () => {
  let attrArr = attrStore.AttrInfoData.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':');
      prev.push({ attrId, valueId });
    }
    return prev;
  }, []);
  params.skuAttrValueList = attrArr;
  let saleAttrArr = spuSaleAttr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
      prev.push({ saleAttrId, saleAttrValueId });
    }
    return prev;
  }, []);
  params.skuSaleAttrValueList = saleAttrArr;
  const data = await reqAddSku(params);
  if (data.code === 200) {
    ElMessage.success('添加SKU成功！');
    onCancel();
  } else {
    ElMessage.error('添加SKU失败！');
  }
};
const handleDefault = (row: SpuImage) => {
  params.skuDefaultImg = row.imgUrl;
  // 清空全部选择
  table.value.clearSelection();
  table.value.toggleRowSelection(row, true);
};
const initHasSkuData = async (row: SpuObj) => {
  if (attrStore.c3Id) {
    // 获取平台属性数据
    await attrStore.getAttrInfo();
    params.category3Id = attrStore.c3Id;
    params.spuId = row.id;
  }
  if (row && row.id) {
    // 获取销售属性数据
    const data: SaleAttrResponseData = await reqSpuSaleAttrList(
      row.id as number,
    );
    const data2: SpuImageResponseData = await reqSpuImageList(row.id as number);
    spuSaleAttr.value = data.data;
    fileList.value = data2.data;
  }
};
defineExpose({ initHasSkuData });
</script>

<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="params.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="params.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input
          placeholder="重量(克)"
          type="number"
          v-model="params.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          placeholder="SKU描述"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="params.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item
            v-for="item in attrStore.AttrInfoData"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select v-model="item.attrIdAndValueId">
              <el-option
                v-for="v in item.attrValueList"
                :key="v.id"
                :label="v.valueName"
                :value="`${item.id}:${v.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item
            v-for="item in spuSaleAttr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select v-model="item.saleIdAndValueId">
              <el-option
                v-for="v in item.spuSaleAttrValueList"
                :key="v.id"
                :label="v.saleAttrValueName"
                :value="`${item.id}:${v.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="fileList" ref="table">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="图片" align="center">
            <template #default="scope">
              <el-image
                fit="fill"
                :src="scope.row.imgUrl"
                :alt="scope.row.imgName"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center" prop="imgName" />
          <el-table-column label="操作" align="center">
            <template #="{ row, $index }">
              <el-button type="primary" @click="handleDefault(row)">
                设为默认图片
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
