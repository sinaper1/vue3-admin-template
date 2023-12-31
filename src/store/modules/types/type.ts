import type { RouteRecordRaw } from 'vue-router';
import type { CategoryData, AttrInfoData } from '@/api/product/attr/type';
import type { records } from '@/api/product/spu/type';

export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  userName: string;
  avatar: string;
  buttons: string[];
  roles: string[];
  routes: string[];
}

export interface AttrState {
  c1Id: number | string;
  category1Data: CategoryData;
  c2Id: number | string;
  category2Data: CategoryData;
  c3Id: number | string;
  category3Data: CategoryData;
  AttrInfoData: AttrInfoData;
}

export interface SpuState {
  records: records;
  total: number;
}
