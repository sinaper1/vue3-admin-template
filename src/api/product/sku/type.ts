import { SkuObj } from '@/api/product/spu/type';

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export type records = SkuObj[];

export interface SkuData {
  records: records;
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}
export interface SkuResponseData extends ResponseData {
  data: SkuData;
}
