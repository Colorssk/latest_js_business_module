import React from 'react';
import style from './index.module.less';
// components
import TopSelect from './TopSelect';
// import Tables from './Table';
import TestTable from './TableTest';
import Aside from './Aside';

const Resale = () => {
  return (
    <div className={style.mainDom}>
      <div className={style.mainLeft}>
        <TopSelect
          id="topSelect"
        />
        {/* <Tables/> */}
        <TestTable/>
      </div>
      <div className={style.asideRight}><Aside/></div>
    </div>
  );
};

export default Resale;
