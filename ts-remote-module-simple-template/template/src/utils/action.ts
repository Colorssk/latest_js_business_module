function instanceInit() {
  let instance: any;
  return (newInstance?: any) => {
    if (newInstance) instance = newInstance;

    Object.seal(instance);
    return instance;
  };
}

const __action = instanceInit();

class Action {
  _dispatch: any;

  constructor({ dispatch }: any) {
    const instance = __action();
    if (instance) return instance;
    this._dispatch = dispatch;
    __action(this);
  }

  static emit = (type: string, result: any) => {
    let timer: any = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      __action()._dispatch({ type, result });
    });
  };
}

export default Action;
