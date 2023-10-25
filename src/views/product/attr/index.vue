<script setup lang="ts">
import { onMounted, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import { reqDeleteAttr, reqSaveAttr } from '@/api/product/attr';
import useAttrStore from '@/store/modules/product/attr';
import { AttrInfo, AttrValue } from '@/api/product/attr/type';

const attrStore = useAttrStore();
// visible为true现在添加或修改卡片，否则显示table数据卡片
const visible = ref<boolean>(false);
// 存储对应的组件实例el-input
const inputArr = ref<any>([]);
// 收集新增或修改属性的对象
const attrParams = reactive<AttrInfo>({
  attrName: '', // 新增的属性名字
  categoryId: '', // 三级分类的ID
  categoryLevel: 3, // 代表的是三级分类
  attrValueList: [], // 新增的属性值数组
});
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
    await attrStore.getAttrInfo();
  } else {
    ElMessage.error('请选择三级分类！');
  }
};
const handleDelete = async (id: number) => {
  // 删除属性
  const result = await reqDeleteAttr(id);
  if (result.code === 200) {
    await handleSearch();
    ElMessage.success('删除属性成功！');
  } else {
    ElMessage.error('删除属性失败！');
  }
};
const handleDeleteAttr = (index: number) => {
  // 删除属性值
  attrParams.attrValueList.splice(index, 1);
};
const handleEdit = (row: AttrInfo) => {
  // 编辑或新增属性
  if (row && row.id) {
    // 编辑属性,row需深拷贝
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  } else {
    // 新增属性，重设默认数据
    Object.assign(attrParams, {
      id: '',
      attrName: '',
      categoryId: attrStore.c3Id,
      attrValueList: [],
    });
  }
  // 切换页面显示，切换到编辑或新增页面
  visible.value = true;
};
const handleAddAttr = () => {
  // 添加属性值
  attrParams.attrValueList.push({
    valueName: '',
    // attrId需要判断外层是否有id值
    attrId: attrParams.id ? attrParams.id : '',
    flag: true,
  });
  // 获取最后一个新增的属性值，然后输入框聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};
const handleCancel = () => {
  visible.value = false;
};
const handleSubmit = async () => {
  // 保存
  const result = await reqSaveAttr(attrParams);
  if (result.code === 200) {
    if (attrParams.id) {
      ElMessage.success('修改属性成功！');
    } else {
      ElMessage.success('添加属性成功！');
    }
    visible.value = false;
    await handleSearch();
  } else if (attrParams.id) {
    ElMessage.success('修改属性失败！');
  } else {
    ElMessage.success('添加属性失败！');
  }
};
const handleBlur = (row: AttrValue, index: number) => {
  //   属性值输入框失去焦点，把flag变为false
  if (!row.valueName.trim()) {
    ElMessage.error('属性值不能为空！');
    // 删除空的属性值
    handleDeleteAttr(index);
    return;
  }
  let repeat = attrParams.attrValueList.find((v) => {
    if (v !== row) {
      if (v.valueName === row.valueName) {
        return v;
      }
    }
  });
  if (repeat) {
    ElMessage.error('属性值不能重复！');
    // 删除重复的属性值
    handleDeleteAttr(index);
    return;
  }
  row.flag = false;
};
const handleClick = (row: AttrValue, index: number) => {
  //   点击属性值的显示框让其变成可以输入
  row.flag = true;
  // 属性值输入框聚焦
  nextTick(() => {
    inputArr.value[index].focus();
  });
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
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrStore.AttrInfoData">
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
            <template #default="scope">
              <el-tag
                style="margin: 5px"
                v-for="item in scope.row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template #default="scope">
              <el-button
                type="primary"
                icon="Edit"
                size="small"
                @click="handleEdit(scope.row)"
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
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          @click="handleAddAttr"
          :disabled="!attrParams.attrName"
        >
          添加属性值
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
        <el-table border style="margin: 10px" :data="attrParams.attrValueList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="scope">
              <el-input
                placeholder="请输入属性值名称"
                :ref="(vc: any) => (inputArr[scope.$index] = vc)"
                v-model="scope.row.valueName"
                v-if="scope.row.flag"
                @blur="() => handleBlur(scope.row, scope.$index)"
              ></el-input>
              <div v-else @click="() => handleClick(scope.row, scope.$index)">
                {{ scope.row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-popconfirm
                title="确认删除这条数据？"
                @confirm="handleDeleteAttr(scope.$index)"
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
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="
            !attrParams.attrValueList.length ||
            !attrParams?.attrValueList[0]?.valueName
          "
        >
          保存
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
