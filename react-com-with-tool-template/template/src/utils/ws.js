import { useEffect } from 'react';
import { useMappedState } from 'redux-react-hook';
// 单例
let _sock;
/**
 * {
 *   [action + subscribeKey]: config
 * }
 */
const subsciptions = {
};

export const useWebSocket = (config = {
  // 订阅的事件
  action: '',
  // 订阅的key, 用于区分每个订阅行为，防止重复订阅
  subscribeKey: '',
  // 订阅唯一值，如果这个值变了，则重新订阅
  subscribeUniqueKey: '',
  // 组件注销的时候是否保留本次订阅
  maintain: false,
  // 订阅时的参数
  params: {},
  // 接收到消息后的处理函数
  onMessage: (e) => console.log('socket message:', e),

}) => {
  const { userInfo: { userId, underwriterID } } = useMappedState(state=>state.auth);
  const subscribeUniqueKey = config.subscribeUniqueKey;

  useEffect(() => {
    if (!underwriterID || !userId) {
      return;
    }
    // 将本次订阅注册
    const conbineKey = `${config.action}-${config.subscribeKey}`;
    delete subsciptions[conbineKey];
    subsciptions[conbineKey] = config;
    if (!_sock || _sock.readyState == WebSocket.CLOSED) {
      _sock = buildClient({
        underwriterID,
        userId,
      });
    }

    return () => {
      // 离开页面的时候, 如果页面没有要求保留回调，则销毁之
      console.log('组件销毁，注销订阅');
      if (!config.maintain) {
        delete subsciptions[conbineKey];
      }
    };
  }, [ underwriterID, userId, subscribeUniqueKey ]);
};

const sendSubscribeMsg = (config) => {
  if (_sock && config.action) {
    const subscribeMsg = {
      action: config.action,
      params: config.params || {},
    };
    _sock.send(JSON.stringify(subscribeMsg));
  }
};

const buildClient = ({ underwriterID, userId }) => {
  const host = window.location.host;
  const preFix = process.env.REACT_APP_ENV === 'wss' ? 'wss' : 'ws';
  const sock = new WebSocket(`${preFix}://${host}/messagepush/webSocket/${underwriterID}/${userId}/deviceNo=1`);
  sock.onopen = function() {
    // 发送订阅消息
    for (const config of Object.values(subsciptions)) {
      sendSubscribeMsg(config);
    }
    heartCheck.reset().start();
  };

  sock.onmessage = function(e) {
    /** 数据样例:
     * {
        "action": "BOND_QUOTE_UPDATE",
        "data": "[{\"bccompanyid\":\"62929\",\"bctraderid\":\"1744\",\"bcuserid\":\"\",\"bidcoupon\":\"\",\"bidcouponV2P\":\"\",\"bidcouponV2Y\":\"\",\"biddocprice\":\"1.00\",\"bidsite\":0,\"bondKey\":\"ORGANBOND2021H0000380000O\",\"buySell\":0,\"capcosttype\":\"\",\"capcostvalue\":\"\",\"ciuserid\":\"\",\"comment\":\"\",\"commission\":0.0000,\"comprehensiveincome\":\"\",\"coupon\":\"\",\"couponinstitutionid\":\"\",\"couponprice\":\"\",\"delflag\":\"0\",\"deliveryPrice\":\"\",\"deliverytype\":4,\"externalinfo\":\"\",\"externalinstitution\":\"\",\"extype\":0,\"id\":\"9cd502593d4b464e8249676ba118a124\",\"listmarket\":\"CIB\",\"mainVendorsId\":\"\",\"mainVendorsName\":\"\",\"managedMarket\":1,\"marketMaker\":\"\",\"modifiedtag\":1,\"netPrice\":\"\",\"openquoteBatchid\":\"\",\"openquoteDetailid\":\"\",\"operation\":2,\"orderId\":\"\",\"outcomefacevalue\":0.0000,\"outcomenetprice\":0.0000,\"outcomequantity\":0E-10,\"payinstitution\":\"\",\"payinstitutionid\":\"\",\"payprice\":\"\",\"piuserid\":\"\",\"qbinstitutionid\":\"\",\"qbinstitutionname\":\"\",\"qbuserid\":\"\",\"qbusername\":\"\",\"qtime\":1629969703000,\"remarks\":\"\",\"returnrate\":\"\",\"returnrateunit\":1,\"returntype\":0,\"seat\":0,\"singlereturntype\":0,\"source\":0,\"sudeliverytype\":2,\"suextype\":1,\"sureturntype\":1,\"underwriterid\":\"402880f034219aed0134219d42e100b5\",\"unit\":0,\"unitV2\":0,\"upperlimit\":\"\",\"vol\":\"10000.0000000000\"}]",
        "status": "SUCCESS",
        "type": "DISTRIBUTE"
      }
     */
    try {
      const data = JSON.parse(e.data);
      if (String(data.code) === '200') {
        for (const config of Object.values(subsciptions)) {
          if (typeof config.onMessage == 'function') {
            config.onMessage(data);
            heartCheck.reset().start();
          }
        }
      }
    } catch (ex) {
      console.log('unparsed message:', e.data);
      console.warn(ex);
    }
  };

  sock.onclose = function() {
    console.log('socket close');
    // 重新连接
    setTimeout(() => {
      console.log('socket reconnecting');
      _sock = buildClient({ underwriterID, userId });
    }, 2000);
  };
  //心跳检测
  var heartCheck = {
    timeout: 30000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      return this;
    },
    start: function() {
      var self = this;
      this.timeoutObj = setTimeout(function() {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        sock.send('心跳测试');//发送这个消息的时候，必须让后端收到消息后，立马发送一个消息，这样来回一个接收过程，就可以判断当前还没有断开连接。
        self.serverTimeoutObj = setTimeout(function() { //如果超过一定时间还没重置，说明后端主动断开了
          console.log('后端断开，重连中');
          sock.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        }, self.timeout);
      }, this.timeout);
    }
  };
  return sock;
};