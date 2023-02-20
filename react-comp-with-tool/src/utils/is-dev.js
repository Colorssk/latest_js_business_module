export const isDev = () => {
  return Boolean(process.env && (process.env['NODE_ENV'] === 'development'));
};

// 判断当前页面是否为 https 协议
export const isLocationSecure = () => {
  return window.location.protocol === 'https:';
};

if (isDev()) {
  window.isLocationSecure = isLocationSecure;
}