// SPU管理模块接口
import request from '@/utils/request';
import type { SpuResponseData } from '@/api/product/spu/type';

enum API {
  GET_SPU_URL = '/admin/product/baseTrademark',
  DEL_SPU_URL = '/admin/product/baseTrademark/remove/{id}',
  // UPDATE_SPU_URL = '/admin/product/baseTrademark/update',
  SAVE_SPU_URL = '/admin/product/baseTrademark/save',
  GET_SPU_DETAIL_URL = '/admin/product/baseTrademark/get/{id}',
}

export const reqGetSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, SpuResponseData>(
    `${API.GET_SPU_URL}/${page}/${limit}?category3Id=${category3Id}`,
  );
