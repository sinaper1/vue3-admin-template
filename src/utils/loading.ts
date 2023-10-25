import { ElLoading } from 'element-plus';

// 定义loading
let loading: any;
let loadingCount: number = 0;

const startLoading = () => {
  loading = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};

const endLoading = () => {
  loading.close();
};

// 开始loading，调用一次startLoadingAddCount方法就开启Loading并loadingCount+1;
export const startLoadingAddCount = () => {
  if (loadingCount === 0) {
    startLoading();
  }
  loadingCount++;
};

// 结束loading，调用一次endLoadingSubCount方法就loadingCount-1直到loadingCount=0则关闭Loading
export const endLoadingSubCount = () => {
  loadingCount--;
  if (loadingCount === 0) {
    endLoading();
  }
};
