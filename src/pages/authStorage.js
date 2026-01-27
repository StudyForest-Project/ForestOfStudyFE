const KEY = 'isLoggedIn';

// 앱 시작시
export const authStorage = {
  isLoggedIn() {
    return localStorage.getItem(KEY) === 'true';
  },
  // 로그인
  login() {
    localStorage.setItem(KEY, 'true');
  },
  // 로그아웃
  logout() {
    localStorage.removeItem(KEY);
  },
};
