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
  category3Id: string | number;
  tmId: number | string;
  spuSaleAttrList: null | SaleAttr[];
  spuImageList: null | SpuImage[];
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
  id?: number;
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
  isChecked?: string;
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
  flag?: boolean;
  saleAttrValue?: string;
  saleIdAndValueId?: string;
}

export type spuSaleAttrList = SaleAttr[];

// SPU已有的销售属性接口返回数据的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: spuSaleAttrList;
}

// 已有的全部SPU的返回数据
export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}

// export interface SaveData {
//   category3Id: number | string;
//   description: string;
//   id?: number;
//   spuImageList: SpuImage[];
//   spuName: string;
//   spuPosterList: SpuImage[];
//   spuSaleAttrList: SaleAttr[];
//   tmId: number | string;
// }

export interface skuAttrValue {
  attrId: number; //平台属性id
  valueId: number; //平台属性值id
}

export interface skuSaleAttrValue {
  saleAttrId: number; //销售属性id
  saleAttrValueId: number; //销售属性值id
}

export interface skuImage {
  imgUrl: string;
  imgName: string;
  isDefault: string;
}

export interface SkuObj {
  category3Id: string | number;
  spuId?: string | number;
  tmId: string | number;
  id?: number;
  skuName: string;
  price?: string | number;
  weight?: string | number;
  skuDesc?: string;
  skuDefaultImg: string;
  skuAttrValueList?: skuAttrValue[];
  skuSaleAttrValueList?: skuSaleAttrValue[];
  skuImageList: skuImage[];
}
