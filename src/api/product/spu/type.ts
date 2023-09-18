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

export type records = SpuObj[];

export interface SpuData {
  records: records;
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}
export interface SpuResponseData extends ResponseData {
  data: SpuData;
}

// 商品图片
export interface SpuImage {
  id: number;
  spuId: number;
  imgName: string;
  imgUrl: string;
}

export type SpuImageData = SpuImage[];

export interface SpuImageResponseData extends ResponseData {
  data: SpuImageData;
}

// 已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  // isChecked:
}

// 存储已有的销售属性值的数组类型
export type spuSaleAttrValueList = SaleAttrValue[];

// 销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: spuSaleAttrValueList;
}

// SPU已有的销售属性接口返回数据的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}
