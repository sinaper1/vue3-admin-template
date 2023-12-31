<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ElMessage, ElInput } from 'element-plus';
import { reqGetTrademarkList } from '@/api/product/trademark';
import {
  reqAllSaleAttr,
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAddSpu,
} from '@/api/product/spu';
import useAttrStore from '@/store/modules/product/attr';
import type { AllTrademark, Records } from '@/api/product/trademark/type';
import type {
  SpuObj,
  HasSaleAttrResponseData,
  SpuImageResponseData,
  SaleAttrResponseData,
  HasSaleAttr,
  SpuImageData,
  SaleAttr,
} from '@/api/product/spu/type';
// import { spuSaleAttrValueList } from '@/api/product/spu/type';
const fileList = ref<UploadUserFile[]>([]);
const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref<string>('');
const TrademarkData = ref<Records>([]);
const saleAttr = ref<HasSaleAttr[]>([]);
// const InputRef = ref<InstanceType<typeof ElInput>>();
// 收集还未选择的销售属性的ID与属性值的名字
const saleAttrIdAndValueName = ref<string>('');
// 存储已有的spu对象
const spuParams = reactive<SpuObj>({
  spuName: '', //名称
  description: '', //描述
  category3Id: '', //三级分类的ID
  tmId: 0, //品牌ID
  spuSaleAttrList: null, //销售属性
  spuImageList: null, //照片墙
});

const attrStore = useAttrStore();

const emit = defineEmits(['handleCancel', 'handleOk']);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const fileTypeArr = ['image/jpeg', 'image/png', 'image/gif'];
  if (!fileTypeArr.includes(rawFile.type)) {
    // 如果文件类型不为jpg、png、gif则不能上传
    ElMessage.error('图片类型必须为jpg、png、gif!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    // 如果文件大于2M则不能上传
    ElMessage.error('图片大小不能超过2M!');
    return false;
  }
  return true;
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleSubmit = async () => {
  if (fileList.value && fileList.value.length) {
    const imgArr: SpuImageData = [];
    fileList.value.map((v: any) => {
      imgArr.push({
        id: v.id ? v.id : null,
        spuId: spuParams.id ? spuParams.id : 0,
        imgUrl: v.response ? v.response.data : v.url,
        imgName: v.name,
      });
    });
    spuParams.spuImageList = imgArr;
  }
  const result = await reqAddSpu(spuParams);
  if (result.code === 200) {
    if (spuParams.id) {
      ElMessage.success('修改成功！');
    } else {
      ElMessage.success('添加成功！');
    }
    fileList.value = [];
    emit('handleOk', { update: !!spuParams.id });
  } else {
    if (spuParams.id) {
      ElMessage.error('修改失败！');
    } else {
      ElMessage.error('添加失败！');
    }
  }
};

const onCancel = () => {
  // 清空照片墙
  fileList.value = [];
  emit('handleCancel');
};

const handleDelete = (index: number) => {
  spuParams?.spuSaleAttrList?.splice(index, 1);
};

const handleClose = (i: number, index: number) => {
  spuParams?.spuSaleAttrList &&
    spuParams?.spuSaleAttrList[i]?.spuSaleAttrValueList.splice(index, 1);
};

const showInput = (row: SaleAttr) => {
  row.flag = true;
  row.saleAttrValue = '';
};

const handleInputConfirm = (row: SaleAttr, index: number) => {
  // 判断属性值是否为空
  if (row.saleAttrValue?.trim()) {
    // 判断属性值是否在数组中存在
    let repeat = row.spuSaleAttrValueList.find((item) => {
      return item.saleAttrValueName == row.saleAttrValue;
    });
    if (repeat) {
      ElMessage.error('销售属性值重复！');
      return;
    }
    spuParams?.spuSaleAttrList &&
      spuParams?.spuSaleAttrList[index]?.spuSaleAttrValueList.push({
        // id: 0,
        spuId: spuParams.id ? spuParams.id : 0,
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrName: row.saleAttrName,
        saleAttrValueName: row.saleAttrValue,
      });
  }
  row.flag = false;
  row.saleAttrValue = '';
};

let unSelectSaleAttr = computed(() => {
  // 剩下未选的销售属性
  let unSelectAttr = saleAttr.value.filter((item) => {
    // 过滤掉全部属性中已有的属性
    return spuParams?.spuSaleAttrList?.every(
      // 若属性值name不相等则返回true，相等则返回false
      (item1) => item.name !== item1.saleAttrName,
    );
  });
  return unSelectAttr;
});

const handleAdd = () => {
  //   添加属性值
  if (saleAttrIdAndValueName.value) {
    let [baseSaleAttrId, saleAttrName] =
      saleAttrIdAndValueName.value.split(':');
    spuParams?.spuSaleAttrList?.push({
      spuId: spuParams.id ? spuParams.id : 0,
      baseSaleAttrId: Number(baseSaleAttrId),
      saleAttrName,
      spuSaleAttrValueList: [],
    });
    saleAttrIdAndValueName.value = '';
  } else {
    ElMessage.error('请选择SPU销售属性值！');
  }
};

const initHasSpuData = async (row: SpuObj) => {
  const data: AllTrademark = await reqGetTrademarkList();
  if (data.code === 200) {
    TrademarkData.value = data.data;
  }
  const data1: HasSaleAttrResponseData = await reqAllSaleAttr();
  if (data1.code === 200) {
    saleAttr.value = data1.data;
  }
  if (row && row.id) {
    const data2: SpuImageResponseData = await reqSpuImageList(row.id as number);
    const data3: SaleAttrResponseData = await reqSpuSaleAttrList(
      row.id as number,
    );
    // const fileArr: UploadUserFile[] = [];
    if (data2 && data2.data && data2.data.length) {
      data2.data.map((v) => {
        fileList.value.push({ ...v, name: v.imgName, url: v.imgUrl });
      });
    }
    // 新增属性，重设默认数据
    Object.assign(spuParams, {
      id: row.id,
      spuName: row.spuName,
      description: row.description,
      category3Id: row.category3Id,
      tmId: row.tmId,
      spuSaleAttrList: data3.data,
      spuImageList: null,
    });
  } else {
    // 新增属性，重设默认数据
    Object.assign(spuParams, {
      // id: '',
      spuName: '',
      description: '',
      category3Id: attrStore.c3Id,
      tmId: '',
      spuSaleAttrList: [],
      spuImageList: null,
    });
  }
};
defineExpose({ initHasSpuData });
</script>

<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请你输入SPU的名称"
          v-model="spuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuParams.tmId">
          <el-option
            v-for="item in TrademarkData"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请你输入SPU的描述"
          :rows="3"
          v-model="spuParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload
          v-model:file-list="fileList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          v-model="saleAttrIdAndValueName"
          :placeholder="
            unSelectSaleAttr.length
              ? `还未选择${unSelectSaleAttr.length}个`
              : '无'
          "
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          ></el-option>
        </el-select>
        <el-button
          icon="Plus"
          type="primary"
          :disabled="!saleAttrIdAndValueName"
          style="margin-left: 10px"
          @click="handleAdd"
        >
          添加属性值
        </el-button>
        <!--table展示销售属性与属性值-->
        <el-table
          border
          style="margin: 10px 0"
          :data="spuParams.spuSaleAttrList"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="销售属性名字"
            align="center"
            width="120px"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="销售属性值" align="center">
            <template #default="scope">
              <el-tag
                v-for="(item, index) in scope.row.spuSaleAttrValueList"
                :key="item.id"
                style="margin-right: 10px"
                closable
                @close="handleClose(scope.$index, index as number)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="scope.row.flag"
                v-model="scope.row.saleAttrValue"
                size="small"
                style="width: 110px"
                placeholder="请输入属性值名称"
                @keyup.enter="handleInputConfirm(scope.row, scope.$index)"
                @blur="handleInputConfirm(scope.row, scope.$index)"
              />
              <el-button
                v-else
                size="small"
                @click="showInput(scope.row)"
                icon="Plus"
                type="primary"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #default="scope">
              <el-popconfirm
                title="确认删除这条数据？"
                @confirm="handleDelete(scope.$index)"
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
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="!spuParams?.spuSaleAttrList?.length > 0"
        >
          保存
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible">
      <el-image fit="fill" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
