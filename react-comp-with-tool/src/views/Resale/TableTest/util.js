import {
  useMappedState,
} from 'redux-react-hook';
import _ from 'lodash';
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