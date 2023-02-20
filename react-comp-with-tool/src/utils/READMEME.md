 // WebSocket 相关操作
 页面A： 开启
  useEffect(() => {
    myStompClient.connect(userId, suId);
    return () => myStompClient.disconnect()
  }, [userId, suId])

  其他页面：
  页面B
  useEffect(() => {
    const subscription = promptMessageSubject.subscribe(res => {
      const body = getWsMsgBody(res)
      if (body?.message) {
        //...
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  页面C
  useEffect(() => {
    const subscription = promptMessageSubject.subscribe(res => {
      const body = getWsMsgBody(res)
      if (body?.message) {
        //...
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // simple socket:
   useWebSocket({
    action: 'push',
    subscribeKey: 'push-return',
    onMessage: msg => {
      handlePushMessage(msg)
    }
  });