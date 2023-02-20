import { removeToken } from '@/utils/auth';
import { loginOut } from '@/services/home';
import { store } from '@/redux/store';
import { removeAllCancelToken } from '@/utils/cancelTokenFactory';
// ActionTypes
export const types = {
  SET_USER_INFO: 'USER/SET_USER_INFO',
  CLEAR_LOGIN_INFO: 'USER/CLEAR_LOGIN_INFO',
  SET_LOADING: 'USER/SET_LOADING'
};
// State
const initState = {
  userInfo: {},
  token: '',
  loading: {} // {url: [options.loading]}
};

// Action
export const actions = {
  setUserInfo: (payload) => {
    return {
      type: types.SET_USER_INFO,
      payload,
    };
  },
  setLoading: (payload) => {
    return {
      type: types.SET_LOADING,
      payload,
    };
  },
  clearLoginInfo: (payload) => {
    const {
      auth: {
        userInfo: { username },
      },
    } = store.getState();
    return (dispatch) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async () => {
        const res = await loginOut({ username });
        if (res.code === '9') {
          removeAllCancelToken(true);
          dispatch({
            type: types.CLEAR_LOGIN_INFO,
            payload,
          });
        }
      });
    };
  },
  //只是清除本地記錄， 不調用接口
  clearLoginInfoNoFetch: (payload) => {
    return {
      type: types.CLEAR_LOGIN_INFO,
      payload,
    };
  },
};

// reducer
const authReducer = (state = initState, action) => {
  switch (action.type) {
  case types.SET_USER_INFO:
    return Object.assign({}, state, {
      userInfo: action.payload.userInfo,
      token: action.payload.token,
    });
  case types.SET_LOADING:
    return Object.assign({}, state, {
      loading: action.payload,
    });
  case types.CLEAR_LOGIN_INFO:
    removeToken();
    return Object.assign({}, state, {
      userInfo: {},
      token: ''
    });
  default:
    return state;
  }
};
export default authReducer;
