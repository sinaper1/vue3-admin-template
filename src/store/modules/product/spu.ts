// SPU管理
import { defineStore } from 'pinia';
import { reqGetSpu } from '@/api/product/spu';
import type { SpuState } from '@/store/modules/types/type';

const useSpuStore = defineStore('SpuStore', {
  state: (): SpuState => {
    return {
      pending: false,
      SpuInfoData: [],
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
      const result = await reqGetSpu(page, limit, category3Id);
      console.log(result, '--result---');
    },
  },
});
export default useSpuStore;
