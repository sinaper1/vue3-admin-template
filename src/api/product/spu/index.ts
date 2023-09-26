// SPU管理模块接口
import request from '@/utils/request';
import type { SpuResponseData } from '@/api/product/spu/type';
import type {
  HasSaleAttrResponseData,
  SaleAttrResponseData,
  SpuObj,
  SpuImageResponseData,
} from '@/api/product/spu/type';

enum API {
  GET_SPU_URL = '/admin/product',
  DEL_SPU_URL = '/admin/product/deleteSpu',
  // 新增SPU
  SAVE_SPU_URL = '/admin/product/saveSpuInfo',
  // 更新SPU
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  GET_SPU_DETAIL_URL = ' /admin/product/getSpuInfo/{spuId}',
  //   获取某个SPU下的全部的售卖的商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList',
  //   获取某个SPU下的全部售卖的商品的属性
  BASE_SALE_ATTR_LIST_URL = '/admin/product/spuSaleAttrList',
  //   获取整个项目全部的销售属性[颜色/版本/尺码]
  SALE_ATTR_LIST_URL = '/admin/product/baseSaleAttrList',
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
  request.get<any, SaleAttrResponseData>(
    `${API.BASE_SALE_ATTR_LIST_URL}/${spuId}`,
  );

export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.SALE_ATTR_LIST_URL);

export const reqAddSpu = (data: SpuObj) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data);
  } else {
    return request.post<any, any>(API.SAVE_SPU_URL, data);
  }
};
