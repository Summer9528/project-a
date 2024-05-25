
// 封装sessionStorage
export const sessionStorage = {
  // 设置值
  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  },

  // 获取值
  getItem(key: string) {
    return sessionStorage.getItem(key);
  },

  // 移除值
  removeItem(key: string) {
    sessionStorage.removeItem(key);
  },

  // 清空所有值
  clear() {
    sessionStorage.clear();
  },
};

// 封装localStorage
export const localStorage = {
  // 设置值
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  // 获取值
  getItem(key: string) {
    return localStorage.getItem(key);
  },

  // 移除值
  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  // 清空所有值
  clear() {
    localStorage.clear();
  },
};
