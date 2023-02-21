import axios from 'axios';
import { store } from '@/redux/store';
import { actions } from '@/redux/modules/auth';
import { addCancelToken, removeCancelToken } from './cancelTokenFactory';
axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => {
    const {
      auth: {
        userInfo: { userId },
        token,
        loading,
      },
    } = store.getState();
    const dispatch = store.dispatch;
    if (process.env.NODE_ENV !== 'development') {
      config.url = config.url.replace('api/', '');
    }
    // 自动置入token
    if (config.url.search('/login') === -1) {
      if (token) {
        config.headers.token = token;
        config.headers.userId = userId;
      }
    }
    if (config.abortEnabled !== false) {
      // 添加 cancelToken 并保存到 config
      const {
        latestCancelToken: {
          configInfo: { cancelTokenId: latesCancelTokenId },
        },
        cancelTokenMap,
      } = addCancelToken(config);
      const addTempLoading = JSON.parse(JSON.stringify(loading));
      addTempLoading[config.url] = true;
      console.log('dispatch', addTempLoading);
      dispatch(actions.setLoading(addTempLoading));
      if (config.debounce) {
        for (const [ key, value ] of Object.entries(cancelTokenMap)) {
          if (String(key) !== String(latesCancelTokenId) && value.configInfo && value.configInfo.url === config.url) {
            removeCancelToken(value.configInfo, true);
          }
        }
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const {
      auth: { loading },
    } = store.getState();
    removeCancelToken(response.config);
    const dispatch = store.dispatch;
    const tempLoading = JSON.parse(JSON.stringify(loading));
    if (tempLoading[response.config.url]) {
      delete tempLoading[response.config.url];
    }
    console.log('删除了', response.data);
    dispatch(actions.setLoading(tempLoading));
    if (response.data) {
      // const code = String(response.data.code);
      // const needToLoginout = [ '1', '4', '5', '204', '205', '206' ]; //需要執行退出的返回碼
      // const loginSuccessCode = [ '200', '0', '9' ]; //0是登錄成功，9是退出成功
      // if (!loginSuccessCode.includes(code)) {
      //   //非成功
      //   if (window.location.href.search('login') === -1 && needToLoginout.includes(code)) {
      //     //非登录页面因为登录信息异常 退出登录 不调用退出接口
      //     dispatch(actions.clearLoginInfoNoFetch());
      //     dispatch(messageActions.initialize());
      //   }
      // } else {
      //   return response.data;
      // }
    } else {
      console.log({ content: '返回的格式有误' });
      return response.data;
    }
  },
  (error) => {
    const {
      auth: { loading },
    } = store.getState();
    const dispatch = store.dispatch;
    const tempLoading = JSON.parse(JSON.stringify(loading));
    if (axios.isCancel(error)) {
      const { abortEnabled, debounce, url } = JSON.parse(error.message);
      //ps: 取消接口 如果是防抖不帮清除loading状态 此处慎用
      if (!abortEnabled || !debounce) {
        if (tempLoading[url]) {
          delete tempLoading[url];
        }
        console.log('删除loading取消接口-------');
        dispatch(actions.setLoading(tempLoading));
      }
      console.log('取消接口成功');
    } else {
      console.log({ content: '请求失败' });
      if (tempLoading[error?.config?.url]) {
        delete tempLoading[error?.config?.url];
      }
      console.log('删除loading请求失败-------');
      dispatch(actions.setLoading(tempLoading));
      console.warn('请求失败', error?.config?.url);
      Promise.reject(error);
    }
  },
);

function apiAxios(method, url, params, postType = 'body') {
  const { abortEnabled = false, debounce = false } = params;
  params.abortEnabled && delete params.abortEnabled;
  params.debounce && delete params.debounce;
  let query = {
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    headers:
      method === 'POST' || method === 'PUT'
        ? { 'Content-Type': 'application/json;charset=UTF-8' }
        : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    abortEnabled: abortEnabled ? abortEnabled : false,
    debounce: debounce ? debounce : false,
  };
  if (method === 'POST' && postType !== 'body') {
    query = { ...query, params };
    query.data && delete query.data;
  }
  return new Promise((resolve, reject) => {
    axios(query)
      .then(function (res) {
        resolve(res);
      })
      .then(function (err) {
        reject(err);
      });
  });
}
export const get = function (url, params) {
  return apiAxios('GET', url, params);
};
export const post = function (url, params, postType = 'body') {
  return apiAxios('POST', url, params, postType);
};
export const put = function (url, params) {
  return apiAxios('PUT', url, params);
};
export const Delete = function (url, params) {
  return apiAxios('DELETE', url, params);
};
