import { persistCombineReducers } from 'redux-persist';
import reducers from './reducersCollect';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native

const config = {
  key: 'mobile',
  storage,
};
// 合并成根reducer
const rootReducer = persistCombineReducers(config,reducers);

export default rootReducer;
