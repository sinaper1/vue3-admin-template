// SPU管理模块接口
import request from '@/utils/request';
import type { SpuResponseData } from '@/api/product/spu/type';
import { SaleAttrResponseData, SpuImageResponseData } from "@/api/product/spu/type";

enum API {
  GET_SPU_URL = '/admin/product',
  DEL_SPU_URL = '/admin/product/deleteSpu',
  // UPDATE_SPU_URL = '/admin/product/baseTrademark/update',
  SAVE_SPU_URL = '/admin/product/saveSpuInfo',
  GET_SPU_DETAIL_URL = ' /admin/product/getSpuInfo/{spuId}',
  //   获取某个SPU下的全部的售卖的商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList',
  //   获取某个SPU下的全部售卖的商品的属性
  SALE_ATTR_LIST_URL = 'GET /admin/product/spuSaleAttrList',
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

export const reqSpuImageList = (spuId: number | string) =>
  request.get<any, SpuImageResponseData>(`${API.IMAGE_URL}/${spuId}`);

export const reqSpuSaleAttrList = (spuId: number | string) =>
  request.get<any, SaleAttrResponseData>(`${API.SALE_ATTR_LIST_URL}/${spuId}`);
