import {
  useMappedState,
} from 'redux-react-hook';
import _ from 'lodash';
import {
  store
} from '@/Redux/';
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

export const userQueryInfo = () => {
  const {
    auth: {
      user
    }
  } = store.getState();
  return {
    crmid: user.cmrId,
    acId: user.userId
  };
};

//容错导出接口参数遍历赋值空字符
export const mapQuery = query => {
  let res = {};
  for (const [ key, value ] of Object.entries(query)) {
    res[key] = typeof (value) !== 'undefined' ? value.toString().trim() : '';
  }
  return res;
};