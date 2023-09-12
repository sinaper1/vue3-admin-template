// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SpuObj {
  id?: number;
  spuName: string;
  description: string;
  category3Id: string;
  tmId: number;
  spuSaleAttrList: null;
  spuImageList: null;
}

export type SpuData = SpuObj[];

export interface SpuResponseData extends ResponseData {
  data: SpuData;
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}
