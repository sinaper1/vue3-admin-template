// SPU管理
import { defineStore } from 'pinia';
import { reqGetSpu } from '@/api/product/spu';
import type { SpuState } from '@/store/modules/types/type';
import { SpuResponseData } from '@/api/product/spu/type';

const useSpuStore = defineStore('SpuStore', {
  state: (): SpuState => {
    return {
      pending: false,
      records: [],
      total: 0,
    };
  },
  actions: {
    async getSpuData(
      page: number,
      limit: number,
      category3Id: number | string,
    ) {
      //   SPU列表数据获取
      this.pending = true;
      const result: SpuResponseData = await reqGetSpu(page, limit, category3Id);
      if (result.code === 200) {
        this.records = result.data && result.data.records;
        this.total = result.data && result.data.total;
      }
    },
  },
});
export default useSpuStore;
