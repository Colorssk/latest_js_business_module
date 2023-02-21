react 版本18.2降级到16.13.1因为redux-react-hook@4.0.3需要react@"^16.8.1",不需要redux-hook 可以提高react版本（业务中选择了redux）
丢掉redux request需要做一些变动, index.js需要改动： import ReactDOM from 'react-dom';换成从 react-dom/client引入

less 4 语法有改动
top: 8px + @font-size-base * @line-height-base / 2 - @font-size-base / 2;
这个是不合法的，改成
top: 8px + (@font-size-base * @line-height-base / 2) - (@font-size-base / 2);
要么降级 less 到 3.x版本