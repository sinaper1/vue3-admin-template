//存储localStorage
export const SET_LOCAL_STORAGE = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

//获取localStorage
export const GET_LOCAL_STORAGE = (key: string):string => {
    return (localStorage.getItem(key) as string);
}