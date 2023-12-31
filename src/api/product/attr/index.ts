// 属性管理
import request from '@/utils/request';
import type {
  CategoryResponseData,
  AttrInfoResponse,
  AttrInfo,
} from '@/api/product/attr/type';

enum API {
  CATEGORY1_URL = '/admin/product/getCategory1',
  CATEGORY2_URL = '/admin/product/getCategory2',
  CATEGORY3_URL = '/admin/product/getCategory3',
  // 获取属性管理全部数据的接口
  ATTR_INFO_LIST_URL = '/admin/product/attrInfoList',
  // 获取单个属性的数据接口
  GET_ATTR_URL = '/admin/product/getAttrValueList',
  // 保存单个属性数据接口
  SAVE_ATTR_URL = '/admin/product/saveAttrInfo',
  // 删除单个属性接口
  DELETE_ATTR_URL = '/admin/product/deleteAttr',
}

// 一级分类请求接口
export const reqCategory1 = () =>
  request.get<any, CategoryResponseData>(API.CATEGORY1_URL);
//二级分类请求接口
export const reqCategory2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(`${API.CATEGORY2_URL}/${category1Id}`);
//三级分类请求接口
export const reqCategory3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(`${API.CATEGORY3_URL}/${category2Id}`);
// 获取属性管理列表数据
export const reqAttrInfoList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrInfoResponse>(
    `${API.ATTR_INFO_LIST_URL}/${category1Id}/${category2Id}/${category3Id}`,
  );
// 属性管理获取单条属性的详情
export const reqAttrInfo = (attrId: number | string) =>
  request.get<any, any>(`${API.GET_ATTR_URL}/${attrId}`);
// 保存单条属性管理信息
export const reqSaveAttr = (data: AttrInfo) =>
  request.post<any, any>(`${API.SAVE_ATTR_URL}`, data);
// 删除单条属性管理
export const reqDeleteAttr = (attrId: number | string) =>
  request.delete<any, any>(`${API.DELETE_ATTR_URL}/${attrId}`);
