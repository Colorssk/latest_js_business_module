/* eslint-disable no-prototype-builtins */
import React from 'react';
import style from './index.module.less';
import {
  Button,
  Checkbox,
} from 'ss-ui-library';
// eslint-disable-next-line no-unused-vars
const { Group } = Checkbox;
const Aside = () => {
  return (
    <div>
      <div className={style.AsideRightList}>
        <Button
          icon="&#xe81c;"
          type="primary"
          className={style.asideRightBtn}
        >
          回转售信息
        </Button>
        <Button
          icon="&#xe81c;"
          type="primary"
          className={style.asideRightBtn}
        >
          回转售收入确认
        </Button>
      </div>
    </div>
  );
};

export default Aside;