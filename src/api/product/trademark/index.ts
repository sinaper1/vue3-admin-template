// 品牌管理接口
import request from '@/utils/request';
import {
  TrademarkResponseData,
  Trademark,
  AllTrademark,
} from '@/api/product/trademark/type';
enum API {
  //   获取已有品牌的接口
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 删除已有品牌的接口
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove',
  // 新增已有品牌
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  //   获取全部品牌的数据
  GET_TRADEMARK_LIST_URL = '/admin/product/baseTrademark/getTrademarkList',
}

//获取已有品牌的接口方法
// page:第几页
// limit：一页多少条数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    `${API.TRADEMARK_URL}/${page}/${limit}`,
  );
// 删除已有品牌
export const reqDelTrademark = (id: number) =>
  request.delete<any, any>(`${API.DELETE_TRADEMARK_URL}/${id}`);

export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    //   修改品牌
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
  } else {
    //   新增品牌
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data);
  }
};

export const reqGetTrademarkList = () =>
  request.get<any, AllTrademark>(API.GET_TRADEMARK_LIST_URL);
