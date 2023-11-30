// SKU管理模块接口
import request from '@/utils/request';
import type { SkuResponseData, ResponseData } from '@/api/product/sku/type';

enum API {
  GET_SKU_URL = '/admin/product/list',
  DELETE_SKU_URL = '/admin/product/deleteSku',
  CANCEL_SALE_SKU_URL = '/admin/product/cancelSale',
  ON_SALE_SKU_URL = '/admin/product/onSale',
}
// 获取sku列表信息
export const reqGetSku = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.GET_SKU_URL}/${page}/${limit}`);
//商品上架
export const reqOnSaleSku = (skuId?: string | number) =>
  request.get<any, ResponseData>(`${API.ON_SALE_SKU_URL}/${skuId}`);
//商品下架
export const reqCancelSaleSku = (skuId?: string | number) =>
  request.get<any, ResponseData>(`${API.CANCEL_SALE_SKU_URL}/${skuId}`);
// 删除单行sku数据
export const reqDeleteSku = (skuId?: string | number) =>
  request.get<any, ResponseData>(`${API.DELETE_SKU_URL}/${skuId}`);
