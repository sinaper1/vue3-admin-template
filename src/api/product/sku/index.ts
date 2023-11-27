// SKU管理模块接口
import request from '@/utils/request';
import type { SkuResponseData, ResponseData } from '@/api/product/sku/type';

enum API {
  GET_SKU_URL = '/admin/product/list',
  DELETE_SKU_URL = '/admin/product/deleteSku',
}

export const reqGetSku = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.GET_SKU_URL}/${page}/${limit}`);

export const reqDeleteSku = (spuId?: string | number) =>
  request.get<any, ResponseData>(`${API.DELETE_SKU_URL}/${spuId}`);
