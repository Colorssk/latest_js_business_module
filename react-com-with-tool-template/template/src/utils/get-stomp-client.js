import _ from 'lodash';
import { getWsSubscribeConfig } from './app-event-bus';
import { isDev } from './is-dev';

const stomp = window.Stomp;

class MyStompClient {
  constructor() {
    this.sockjsUrl = null;
    this.headers = null;
    this._stompClient = null;
    this.subscriptions = [];
  }

  init(option) {
    option = _.defaults(option, {
      sockjsUrl: null,
      headers: {} // login, passcode
    });

    this.sockjsUrl = option.sockjsUrl;
    this.headers = option.headers;
    this._stompClient = stomp.client(this.sockjsUrl);
    this._stompClient.reconnect_delay = 5 * 1000;
    this._stompClient.constructor.prototype.debug = (msg) => {
      console.debug('[MyStompClient][debug][stomp]', msg);
    };
  }

  connect(userId, crmId){
    this.userId = userId;
    this.crmId = crmId;

    if (!this.sockjsUrl || !this.headers || !this._stompClient) {
      throw new Error('调用connect之前必须先调用init方法!');
    }

    this._stompClient.connect(this.headers, this.onConnect, this.onError, this.onClose);
  }

  onConnect(){
    const subscribeConfig = getWsSubscribeConfig(this.userId, this.crmId);
    subscribeConfig.forEach(({ url, handler }) => {
      const subscription = this._stompClient.subscribe(url, handler);
      this.subscriptions.push({
        url,
        handler,
        subscription
      });
    });
  }

  onError(msg){
    console.log('[src/utils/get-stomp-client.js]StompClient.onError called, msg=', msg);
  }

  onClose(event){
    console.log('[src/utils/get-stomp-client.js]StompClient.onClose called, event=', event);
  }

  disconnect(){
    try {
      this.subscriptions.forEach(({ subscription }) => {
        subscription && subscription.unsubscribe();
      });
    } catch (err) {
      console.error(err, 'unsubscribe error!');
    }
    this._stompClient.disconnect();
  }
}

const myStompClient = new MyStompClient();

if (isDev()) {
  window.myStompClient = myStompClient;
  window._ = _;
}

export default myStompClient;