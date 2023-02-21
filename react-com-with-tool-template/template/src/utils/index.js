import { useMappedState } from 'redux-react-hook';
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * @description 将时间戳转换为年-月-日-时-分-秒格式
 * @param {String} timestamp
 * @returns {String} 年-月-日-时-分-秒
 */

export function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

  let strDate = Y + M + D + h + m + s;
  return strDate;
}

// 基础排序
// eslint-disable-next-line no-unused-vars
export const mergeSort = (arr, args = {}) => {
  const length = arr.length;
  if (length <= 1) {
    return arr;
  }
  const mid = Math.floor(length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid, length);
  return merge(mergeSort(left, args), mergeSort(right, args), args);
};

const merge = (left, right, args) => {
  const innerSortCompare = Object.prototype.toString.call(args['innerSortCompare']) === '[object Function]' && args['innerSortCompare'];
  const compareArgs = JSON.parse(JSON.stringify(args));
  delete compareArgs.innerSortCompare;
  const result = [];
  let il = 0;
  let ir = 0;
  while (il < left.length && ir < right.length) {
    if (innerSortCompare(left[il], right[ir], compareArgs)) {
      result.push(left[il]);
      il++;
    } else {
      result.push(right[ir]);
      ir++;
    }

  }
  while (il < left.length) {
    result.push(left[il]);
    il++;
  }
  while (ir < right.length) {
    result.push(right[ir]);
    ir++;
  }
  return result;
};

// if login
export const useIsLogin = () => {
  const { token } = useMappedState(state => ({
    token: state.user.token || null
  }));
  return token;
};

export const isDOM = (item) => {
  return (typeof HTMLElement === 'function')
    ? (item instanceof HTMLElement)
    : (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'));
};