<script setup lang="ts">
import { ref } from 'vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
const fileList = ref<UploadUserFile[]>([]);
const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref<string>('');

const emit = defineEmits(['handleCancel']);
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleSubmit = () => {
  console.log('---handleSubmit---');
};
</script>

<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请你输入SPU的名称"></el-input>
      </el-form-item>
      <el-form-item label="SPu品牌">
        <el-select>
          <el-option label="华为"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请你输入SPU的描述"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select>
          <el-option>测试</el-option>
        </el-select>
        <el-button icon="Plus" type="primary" style="margin-left: 10px">
          添加属性值
        </el-button>
        <!--table展示销售属性与属性值-->
        <el-table border style="margin: 10px 0">
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
          ></el-table-column>
          <el-table-column label="销售属性值" align="center"></el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="120px"
          ></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="emit('handleCancel')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
