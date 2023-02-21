// import { store } from '@/redux/store';
// import { actions } from '../redux/modules/push';
//处理推送消息
// argument： { content={}, messagePushType='other', operateType='' }
export const handlePushMessage  = () => {
//   const editTypeWhiteList = [ 'inquiry','quot' ];// 有操作记录(del,update的白名单, 需要判断OperateType)
//   // const OperateTypeMap = {'0': 'update','1': 'add','2': 'del'}
//   // 判断增删改查的
//   const res = { editType: false, list: [] };// 存储的推送消息的模板
//   if(messagePushType!=='other'){
//     if(editTypeWhiteList.includes(messagePushType)){
//       res.editType = operateType;
//     }
//     res.list.push(content);
//   }
//   const dispatch = store.dispatch;
//   dispatch(actions.setPush({
//     type: messagePushType,
//     data: res
//   }));
};