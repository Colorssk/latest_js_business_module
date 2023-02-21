// import { preFetchLib } from 'hel-micro';
import { libReady, isMasterApp } from 'hel-lib-proxy';
import { LIB_NAME } from './configs/subApp';

async function main() {
  // 如有其他包依赖，且需要在逻辑里静态导入，可在此处执行预抓取
  // await helMicro.preFetchLib('other-lib');

  const libProperties = await import('./entrance/libProperties');
  console.log('libProperties', libProperties);
  // 表示模块已准备就绪，注意此处传递的是 default
  libReady(LIB_NAME, libProperties.default);

  // 非子应用时（即不是被别的模块触发载入的情况），自己挂载渲染节点，方便本地调试
  if (isMasterApp()) {
    await import('./loadApp');
  }
}

main().catch(console.error);

// avoid isolatedModules warning
export default 'remote Module Index file';
