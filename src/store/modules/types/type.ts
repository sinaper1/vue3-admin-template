import type { RouteRecordRaw } from 'vue-router';

export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  userName: string;
  avatar: string;
  buttons: string[];
  roles: string[];
  routes: string[];
}
