// 商品属性管理仓库
import { defineStore } from 'pinia';
import {
  reqCategory1,
  reqCategory2,
  reqCategory3,
  reqAttrInfoList,
} from '@/api/product/attr';
import type { AttrState } from '@/store/modules/types/type';
import type { CategoryResponseData } from '@/api/product/attr/type';

const useAttrStore = defineStore('AttrStore', {
  state: (): AttrState => {
    return {
      pending: false,
      c1Id: '',
      category1Data: [],
      c2Id: '',
      category2Data: [],
      c3Id: '',
      category3Data: [],
      AttrInfoData: [],
    };
  },
  actions: {
    async useCategory1() {
      const result: CategoryResponseData = await reqCategory1();
      if (result.code === 200) {
        this.category1Data = result.data;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async useCategory2() {
      const result: CategoryResponseData = await reqCategory2(this.c1Id);
      if (result.code === 200) {
        this.category2Data = result.data;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async useCategory3() {
      const result: CategoryResponseData = await reqCategory3(this.c2Id);
      if (result.code === 200) {
        this.category3Data = result.data;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async getAttrInfo() {
      // 属性管理列表数据请求接口
      this.pending = true;
      const result = await reqAttrInfoList(this.c1Id, this.c2Id, this.c3Id);
      if (result.code === 200) {
        this.AttrInfoData = result.data;
        this.pending = false;
      } else {
        this.pending = false;
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});

export default useAttrStore;
