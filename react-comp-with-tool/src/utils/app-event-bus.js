import { Subject } from 'rxjs';
import _ from 'lodash';

export const subscriptionInstance = new Subject();

export const getWsSubscribeConfig = _.memoize((userId, crmId) => {
  return [
    {
      url: `/topic/user/${userId}/${crmId}/prompt_message`, // 修改可投比例或者发行量导致的消息弹框(投资经理-全局提示),
      handler: (res) => subscriptionInstance.next(res),
    }
  ];
}, (userId, crmId) => `${userId}-${crmId}`);

// 解析 WebSocket 消息(JSON 格式)
export const getWsMsgBody = (msg) => {
  let result;
  if (_.isString(msg)) {
    result = JSON.parse(msg);
  } else {
    result = msg;
  }
  return JSON.parse(result?.body);
};