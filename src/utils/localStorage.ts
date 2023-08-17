//存储localStorage
export const SET_LOCAL_STORAGE = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

//获取localStorage
export const GET_LOCAL_STORAGE = (key: string): string => {
  return localStorage.getItem(key) as string;
};

// 删除localStorage
export const REMOVE_LOCAL_STORAGE = (key: string): void => {
  localStorage.removeItem(key);
};
