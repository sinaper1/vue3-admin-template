// SPU管理模块接口
import request from '@/utils/request';
import type { SpuResponseData } from '@/api/product/spu/type';

enum API {
  GET_SPU_URL = '/admin/product',
  DEL_SPU_URL = '/admin/product/deleteSpu',
  // UPDATE_SPU_URL = '/admin/product/baseTrademark/update',
  SAVE_SPU_URL = '/admin/product/saveSpuInfo',
  GET_SPU_DETAIL_URL = ' /admin/product/getSpuInfo/{spuId}',
}

export const reqGetSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, SpuResponseData>(
    `${API.GET_SPU_URL}/${page}/${limit}?category3Id=${category3Id}`,
  );

export const reqDelSpu = (id: number | string) =>
  request.delete<any, any>(`${API.DEL_SPU_URL}/${id}`);
