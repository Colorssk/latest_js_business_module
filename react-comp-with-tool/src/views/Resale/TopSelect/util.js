import {
  useMappedState,
} from 'redux-react-hook';
import {
  loadMoreData
} from '@/Api/History';
import {
  useEffect,
  useRef,
} from 'react';
import _ from 'lodash';
export const handleTabFix = async (ssLoading, dataSource, fn) => {
  let offsetTop = document.getElementsByClassName('ant-table-body')[0];
  if (offsetTop && offsetTop.scrollTop + offsetTop.clientHeight === offsetTop.scrollHeight && offsetTop.scrollHeight > 0 && offsetTop.scrollTop > 0) {
    if (!ssLoading) {
      //避免重复加载
      const tempData = JSON.parse(JSON.stringify(dataSource || []));
      const res = tempData.concat(await loadMoreData({
        startIndex: dataSource.length
      }));
      fn(res);
      return {
        dataSource: res
      };
    }
  }
};
export const useGetDataSource = ({
  key,
  nameSpace = ''
}) => {
  const res = useMappedState((state) => {
    return {
      [key]: _.get(state, nameSpace.split('.'), []),
    };
  });
  return res;
};

//查找对应key值
export const findKey = (title, data) => {
  let resKey = '';
  for (const [ key, value ] of Object.entries(data)) {

    if (value['title'] === title.trim().slice(0, title.length - 1)) {
      resKey = key;
    }

  }

  return resKey;
};
export function useDidUpdateEffect(fn, connectValue,) {
  const didMountRef = useRef(0);
  useEffect(() => {
    if (didMountRef.current>1){
      fn();
    }else {
      didMountRef.current++;
    }
  }, connectValue);
}
// 过滤承销商数据
export const filterOptions = (array=[],name,key='shortNameC')=>{
  return array.filter(e=>{
    return e[key].indexOf(name)!==-1;
  });
};