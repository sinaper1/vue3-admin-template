<script setup lang="ts">
import { ref } from 'vue';

const value = ref<number | string>('');
const value2 = ref<number | string>('');
const value3 = ref<number | string>('');
// 父组件传过来的props
defineProps({
  title1: Array,
  category1Data: Array,
  category2Data: Array,
  category3Data: Array,
  visible: Boolean,
});
// 引入父组件传过来的事件
const emit = defineEmits([
  'handleCategory1ed',
  'handleCategory2ed',
  'handleCategory3ed',
]);
const handleCategory1 = (value: number) => {
  // 一级分类change事件
  value2.value = '';
  value3.value = '';
  emit('handleCategory1ed', value);
};
const handleCategory2 = (value: number) => {
  // 二级分类change事件
  value3.value = '';
  emit('handleCategory2ed', value);
};
const handleCategory3 = (value: number) => {
  // 三级分类change事件
  emit('handleCategory3ed', value);
};
</script>

<!--三级分类全局组件-->
<template>
  <div>
    <el-form :inline="true">
      <el-form-item :label="title1?.[0]">
        <el-select
          @change="handleCategory1"
          v-model="value"
          :disabled="visible"
        >
          <el-option
            v-for="item in category1Data"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="title1?.[1]">
        <el-select
          @change="handleCategory2"
          v-model="value2"
          :disabled="visible"
        >
          <el-option
            v-for="item in category2Data"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="title1?.[2]">
        <el-select
          @change="handleCategory3"
          v-model="value3"
          :disabled="visible"
        >
          <el-option
            v-for="item in category3Data"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
