<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import {
  reqHasTrademark,
  reqDelTrademark,
  reqAddOrUpdateTrademark,
} from '@/api/product/trademark';
import type { Records } from '@/api/product/trademark/type';
import { TrademarkResponseData, Trademark } from '@/api/product/trademark/type';

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
// const small = ref<boolean>(false);
// const background = ref<boolean>(true);
const total = ref<number>(0);
// 表格数据
const dataSource = ref<Records>([]);
// 控制对话框的显示
const dialogFormVisible = ref<boolean>(false);
// 对话框的标题
const dialogFormTitle = ref<string>('');
// 获取el-from组件实例
const formRef = ref();
// 定义收集新增品牌的数据
let trademarkParams = reactive<Trademark>({
  // 品牌名称
  tmName: '',
  // 品牌logo图片
  logoUrl: '',
});
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getHasTrademark();
};
// 查询列表数据
const getHasTrademark = async (pager = 1) => {
  currentPage.value = pager;
  let result: TrademarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  );
  if (result.code === 200) {
    total.value = result.data.total;
    dataSource.value = result.data.records;
  }
};
// 点击添加品牌按钮
const handleAdd = () => {
  // 清空之前的数据
  trademarkParams.id = undefined;
  trademarkParams.logoUrl = '';
  trademarkParams.tmName = '';
  dialogFormTitle.value = '添加品牌';
  nextTick(() => {
    // 清除上一次的错误校验
    formRef.value.clearValidate('tmName');
    formRef.value.clearValidate('logoUrl');
  });
  dialogFormVisible.value = true;
};
// 点击修改品牌按钮
const handleEdit = (row: Trademark) => {
  // 给对话框赋值当前选择的数据
  // trademarkParams.id = row.id;
  // trademarkParams.logoUrl = row.logoUrl;
  // trademarkParams.tmName = row.tmName;
  Object.assign(trademarkParams, row);
  dialogFormTitle.value = '修改品牌';
  nextTick(() => {
    // 清除上一次的错误校验
    formRef.value.clearValidate('tmName');
    formRef.value.clearValidate('logoUrl');
  });
  dialogFormVisible.value = true;
};
// 点击删除按钮
const handleDelete = async (id: number) => {
  let result = await reqDelTrademark(id);
  if (result.code === 200) {
    ElMessage.success('删除品牌成功！');
    await getHasTrademark(
      dataSource.value.length > 1 ? currentPage.value : currentPage.value - 1,
    );
  } else {
    ElMessage.error('删除品牌失败！');
  }
};
// 组件挂载完毕钩子函数
onMounted(() => {
  getHasTrademark();
});
// 图片上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!);
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate('logoUrl');
};

// 图片上传成功之前约束文件的类型与大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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
// 对话框取消按钮
const handleCancel = () => {
  dialogFormVisible.value = false;
};
// 对话框确定按钮
const handleSubmit = async () => {
  // 先进行表单校验
  await formRef.value.validate();
  let result = await reqAddOrUpdateTrademark(trademarkParams);
  if (result.code === 200) {
    dialogFormVisible.value = false;
    ElMessage.success(trademarkParams.id ? '修改品牌成功！' : '添加品牌成功！');
    await getHasTrademark(currentPage.value);
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失败！' : '添加品牌失败！');
  }
};
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  // 校验品牌LOGO
  if (value) {
    callback();
  } else {
    callback(new Error('请上传品牌LOGO！'));
  }
};
const validateTmName = (rule: any, value: any, callback: any) => {
  //  校验品牌名称
  if (value.trim().length >= 2) {
    callback();
  } else {
    // 校验未通过
    callback(new Error('品牌名称要大于等于两个字符！'));
  }
};
const rules = {
  logoUrl: [{ required: true, validator: validateLogoUrl }],
  tmName: [{ required: true, validator: validateTmName, trigger: 'blur' }],
};
</script>

<template>
  <el-card class="box-card">
    <div>
      <el-button type="primary" icon="Plus" @click="handleAdd">
        添加品牌
      </el-button>
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
              @click="handleEdit(scope.row)"
              type="primary"
              icon="Edit"
            ></el-button>
            <el-popconfirm
              title="确认删除这条数据？"
              @confirm="handleDelete(scope.row.id)"
              width="200"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :currentPage="currentPage"
        :pageSize="pageSize"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="getHasTrademark"
      />
    </div>
  </el-card>
  <!--对话框组件：品牌的添加与修改-->
  <el-dialog v-model="dialogFormVisible" :title="dialogFormTitle">
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          placeholder="请您输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
