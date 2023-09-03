// 分类接口相关的ts类型

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 分类ts类型
export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

export type CategoryData = CategoryObj[];

//相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryData;
}

// 属性值对象的数据类型
export interface AttrValue {
  id: number;
  valueName: string;
  attrId: number;
}

// 存储每一个属性值的数据类型
export type AttrValueList = AttrValue[];

// 属性对象的数据类型
export interface AttrInfo {
  id: number;
  attrName: string;
  categoryId: number;
  categoryLevel: number;
  attrValueList: AttrValueList;
}

// 存储每一个属性对象的数据ts类型
export type AttrInfoData = AttrInfo[];

// 属性接口返回的数据ts类型
export interface AttrInfoResponse extends ResponseData {
  data: AttrInfoData;
}
