/**
 * 该文件仅用于演示，可删除或者根据自己想在本地启动时做一些其他工作而调整
 */
import { LIB_NAME } from 'configs/subApp';
import { random } from 'utils/num';

function __callMethod__() {
  const num = random(100);
  forceRender(`${num}_${Date.now()}`);
}
// @ts-ignore
window.__callMethod__ = __callMethod__;

const usageSnippet = `
    <span style="color:#c62d31">---> lazy load mode</span>
    <pre style="background-color:lightgray;padding-top:12px">
    import helMicro from 'hel-micro';

    export async function callRemoteMethod(){
      const remoteLib = await helMicro.preFetchLib('${LIB_NAME}');
      // now you can call the remote lib by 'remoteLib' reference
    }
    </pre>
    <span style="color:#c62d31">---> preload mode</span>
    <pre style="background-color:lightgray;padding-top:12px">
    // call preFetchLib at entry js file
    (async function(){
      const helMicro = await import('hel-micro');
      await helMicro.preFetchLib('${LIB_NAME}');
      import('./loadApp'); // move your app original entry file content to this file and load it
    })();

    /** --------------------------------------------------------------------------- */
    import remoteLib from '${LIB_NAME}';
    remoteLib.num.random(19); // now you can call the remote safely just like local module
    </pre>
`;

function forceRender(result = '') {
  let con = document.querySelector('#container');
  if (!con) {
    con = document.createElement('div');
    con.id = 'container';
    document.body.append(con);
  }
  con.innerHTML = `
    <div style="padding:60px;">
      <%= helloInfomation %>
      <fieldset>
        <legend>usage snippet</legend>
        ${usageSnippet}
      </fieldset>
    </div>
  `;
}

forceRender();
