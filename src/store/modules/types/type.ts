import type { RouteRecordRaw } from 'vue-router';
import type { CategoryObj } from '@/api/product/attr/type';

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
  category1Data: CategoryObj[];
  c2Id: number | string;
  category2Data: CategoryObj[];
  c3Id: number | string;
  category3Data: CategoryObj[];
}
