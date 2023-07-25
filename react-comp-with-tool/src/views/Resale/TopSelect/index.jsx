import React, { useEffect,useRef,useState } from 'react';
import { Button, DatePicker, } from 'ss-ui-library';
import { Select } from 'antd';
import Filter from '@/Component/Filter';
import FilterNoAll from '@/Component/FilterNoAll';
import { useDispatch } from 'redux-react-hook';
// eslint-disable-next-line no-unused-vars
import { handleTabFix, useGetDataSource, findKey, useDidUpdateEffect } from './util';
import _ from 'lodash';
import Moment from 'moment';
// import { useWebSocket } from '@/Util/Ws';
// config
import { config, constData, initQueryRef, filterDataNoTAll, configNoAll } from './config';
// api
import { getQuerySearch } from '@/Api/History';
import { getProductValidMenu } from '@/Api/BondType';
import style from './index.module.less';
const TopSelect = () => {
  // init data
  const [ historyQueryVOs,setHistoryQueryVOs ] = useState([]);
  const [ issuerInfoVOS,setIssuerInfoVOS ] = useState([]);
  const [ timeKey ] = useState(1);
  const [ keyOPvalue, setKeyOPvalue ] = useState(undefined);
  const [ queryTexts, setQueryTexts ] = useState('机构，债券，发行商');
  const [ justListdataList, setJustListdataList ] = useState([]);
  const [ showAlltime, setShowAlltime ] = useState([
    Moment().subtract(1, 'months').format('YYYY-MM-DD'),
    Moment().format('YYYY-MM-DD'),
  ]);
  const [ timeComUpdate,setTimeComUpdate ] = useState(true);
  const [ newWebsocket,setNewWebsocket ] = useState(false);// 判断是否又最新数据
  //ref
  let dataRef = useRef([]);
  let queryRef = useRef({});
  let isReloadTableRef = useRef(false);
  const filterrRefs = useRef({
    productRef: useRef(),
    hotBondsRef: useRef(),
    deadLineRef: useRef(),
    bodyRef: useRef(),
    cooporationRef: useRef(),
    projectStageRef: useRef(),
  });
  const { Option } = Select;
  const dispatch = useDispatch();
  const bondType = (name) => {
    if (justListdataList.length > 0) {
      let type = justListdataList.filter((val) => val.bondTypeName.match(name));
      return type.length;
    }
  };
  // useWebSocket({
  //   action: 'hisDistData',
  //   subscribeKey: 'bond-sales-history-array-list',
  //   onMessage: msg => {
  //     const { data=[] } = msg;
  //     if(data.length){
  //       setNewWebsocket(true);
  //     }
  //   }
  // });
  // 初始化所有状态
  // eslint-disable-next-line no-unused-vars
  /**
   * 
   * @param {*} fn including callback means don't need load data 
   */
  const initShowAll = async (fn=()=>{})=>{
    setKeyOPvalue('');
    // setEntCor('ALL');
    setQueryTexts('机构，债券，发行商');
    setShowAlltime([
      Moment().subtract(1, 'months').format('YYYY-MM-DD'),
      Moment().format('YYYY-MM-DD'),
    ]);
    setNewWebsocket(false);
    queryRef.current = initQueryRef;

    setTimeComUpdate(false);
    // 目前， 不管是哪个filter共用一个复位方法逻辑 所有选中状态复位
    for(const [ key ] of Object.entries(filterrRefs.current)){
      console.log('ref, key', key, filterrRefs.current[key].current);
      filterrRefs.current[key].current.initFilterEnabled();
    }
    // table兄弟组件复位查询条件 isUpdateTableFilter
    dispatch({
      type: 'SET:resale',
      payload: {
        isUpdateTableFilter: true,
      }
    });
    // 复选框归位后，产品全部需要传所有的有效值
    filterAllValidBondTypeIds();
    if(fn.toString()!=='()=>{}'){
      fn();
    }
    // 更新数据
    dispatch({
      type: 'SET:resale',
      payload: {
        isReloadTable: !isReloadTableRef.current,
      }
    });
    setTimeComUpdate(true);
  };
  // 筛选条件 filter render
  const filterRender = ()=>{
    return Object.keys(constData).map((key,index)=>{
      const item = constData[key];
      return (<div key={index} className={`${style.selectItem} ${style.gInlineblock}`}>
        <Filter
          title={`${item.title}：`}
          key={index}
          isCtrl={item.title!=='地方债'}
          ref={filterrRefs.current[`${key}Ref`]}
          onChange={handleChangeQueryTab}
          filters={config(bondType)[key]}
        />
      </div>);
    });
  };
  // 项目阶段筛选条件
  const filterProjectStage = ()=>{
    return Object.keys(filterDataNoTAll).map((key,index)=>{
      const item = filterDataNoTAll[key];
      return (<div key={index} className={`${style.selectItem} ${style.gInlineblock}`}>
        <FilterNoAll
          title={`${item.title}：`}
          key={index}
          ref={filterrRefs.current[`${key}Ref`]}
          onChange={handleChangeQueryTabNotAll}
          filters={configNoAll(bondType)[key]}
        />
      </div>);
    });
  };
  // 获取dataSource
  dataRef.current = useGetDataSource({ key: 'dataSource', nameSpace: 'resale.dataSource' })['dataSource'] || [];
  //获取排序字段查询条件
  const sortInfo = useRef({});
  sortInfo.current = useGetDataSource({ key: 'tableSort', nameSpace: 'resale.tableSort' })['tableSort'] || {};
  // 获取是否重新加载列表
  isReloadTableRef.current = useGetDataSource({ key: 'isReloadTable', nameSpace: 'resale.isReloadTable' })['isReloadTable'];
  // 组件初始化
  useEffect(async () => {
    // 初始化清空dataSource
    dispatch({
      type: 'CLEAR:resale',
    });
    queryRef.current = { ...initQueryRef };
    //时间初始化
    const [ issueStartDateStartDate,issueStartDateEndDate ] =  showAlltime.toString().split(',');
    queryRef.current = { ...queryRef.current,issueStartDateStartDate,issueStartDateEndDate };
    console.log('useEffect');
    const justListdataListRes =  await getProductValidMenu();
    setJustListdataList(justListdataListRes);
    return () => {
      dataRef.current = [];
    };
  }, []);
  // 监控queryRef一旦变化发送到全局
  useEffect(()=> {
    console.log('queryRef.current',queryRef.current);
    dispatch({
      type: 'SET:resale',
      payload: {
        queryData: queryRef.current,
      }
    });
  },[ queryRef.current ]);
  // 发行日时间空间交互
  const timeOnChange = async (_,dateString)=>{
    const [ issueStartDateStartDate,issueStartDateEndDate ] =  dateString.toString().split(',');
    setShowAlltime([ issueStartDateStartDate,issueStartDateEndDate ]);
    queryRef.current = { ...queryRef.current,issueStartDateStartDate,issueStartDateEndDate };
    // 加载数据
    console.log('timeOnChange');
  };
  const searchlist = (historyQueryVOs||[]).map((items) => <Option title={items.shortName + (items.projSubname ? `(${items.projSubname})` : '')} className={style.searchList} res={items} key={items.id}>
    <span className={style.leftSpan}>{items.bondCode}</span>
    <span className={style.leftSpan}>{items.shortName == null ? '' : items.shortName}{items.projSubname ? `(${items.projSubname})` : ''}</span>
    <span className={style.rightSpan}>{items.issuerRatingCurrent == null ? '' : items.issuerRatingCurrent}</span>
    <span className={style.rightSpan}>{items.cstMaturityTerm == null ? '' : items.cstMaturityTerm}</span>
  </Option>)||<></>;
  const searchlistPeo = (issuerInfoVOS||[]).map((items) =>
    <Option res={items.institutionCode} title={items.fullNameC} key={items.id} className={style.oneSearchlist}>
      {items.fullNameC}
    </Option>)||<></>;
  // 查询条件切换
  const handleChangeQueryTab = async (tabs) => {
    const { filterTitle, filterSelect = [] } = tabs;
    let projects = [];
    const tabKey = findKey(filterTitle, constData);
    if(filterSelect&&filterSelect.length){
      if (filterSelect.length === 1 && filterSelect[0] === '全部') {
        projects = (dataRef.current || []).map(item => item ? item.bondTypeId : '');
      } else {
        projects = filterSelect.map(item => {
          return constData[tabKey]['value'][item];
        });
      }
    
    }
    //清理table
    dispatch({
      type: 'CLEAR:resale',
    });
    //过滤掉空值和undefined
    projects = projects.filter(el=>el!==undefined);
    // 多选
    queryRef.current = { ...queryRef.current, [constData[tabKey]['paramKey']]: projects.join(',') };
    if(constData[tabKey]['paramKey']==='bondTypeIds' && projects.length===0){
      filterAllValidBondTypeIds();
    }
    //此处之后useDidUpdateEffect 内会调用接口，接口参数继承过去无问题
  };
  const handleChangeQueryTabNotAll = async (tabs) => {
    const { filterTitle, filterSelect = [] } = tabs;
    let projects = [];
    const tabKey = findKey(filterTitle, filterDataNoTAll);
    if(filterSelect&&filterSelect.length){
      projects = filterSelect.map(item => {
        return filterDataNoTAll[tabKey]['value'][item];
      });
    }
    //清理table
    dispatch({
      type: 'CLEAR:resale',
    });
    //过滤掉空值和undefined
    projects = projects.filter(el=>el!==undefined);
    // 多选
    queryRef.current = { ...queryRef.current, [filterDataNoTAll[tabKey]['paramKey']]: projects.join(',') };
  };
  // product checkbox function filter all valid options
  const filterAllValidBondTypeIds = ()=>{
    //产品复选功能，根据接口过滤
    const { product:{ value:allProductOptions } } = constData;
    const validOptionsNames = justListdataList.map(e=>e.bondTypeName);
    const allBondTypeIdsValid =  validOptionsNames.map(e=>allProductOptions[e]);
    queryRef.current['bondTypeIds'] = allBondTypeIdsValid.join(',');
  };
  // 右上角输入框查询
  const handleSearch = async function(value) {
    if (value.length == 1) {
      return;
    }
    if (value) {
      setKeyOPvalue(value);
      const res = await getQuerySearch({ search:value });
      setHistoryQueryVOs(res['historyQueryVOs']);
      setIssuerInfoVOS(res['issuerInfoVOS']);
      setQueryTexts(value);
    } else {
      setKeyOPvalue('');
      setQueryTexts('');
    }
  };
  // 右上角输入框快捷查询
  const keydown = async e => {
    if (e.key == 'Enter') {
      if (document.getElementsByClassName('tablse-drop-down')[0] && document.getElementsByClassName('tablse-drop-down')[0].getElementsByClassName('ant-select-dropdown-menu-item-active')[0]) {
        return;
      } else {
        // 此处直接查询
        queryRef.current = { ...queryRef.current, search: e.target.value };
        console.log('keydown');
      }

    }
  };
  // 右上角下拉框选中查询
  const handleChange = async (value, type) => {
    let param = {};
    if(type){
      if(Array.isArray(type['children'])){
        param['id'] = type['key'];
      }else{
        param['issuerCodes'] = type['res'];
      }
    }
    //状态回到初始化状态
    initShowAll(async ()=>{
      queryRef.current = { ...queryRef.current, ...param };
    });
    
  };
  return (
    <div className={style.selectSearch}>
      <div className={style.seleToptime}>
        <Button type="primary" yellow onClick={()=>{initShowAll();}}>
          SHOW ALL
        </Button>
        行权日：
        {timeComUpdate?<DatePicker onChange={timeOnChange} key={timeKey} picker="range" defaultValue={showAlltime} />:<></>}

        <div className={style.SearchTopRight}>
          <Select
            className={style.myInput}
            showSearch
            renderemptynode={'No Data'}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            allowClear={true}
            dropdownClassName={'tablse-drop-down'}
            value={keyOPvalue}
            onSearch={_.debounce(handleSearch,500)}
            onInputKeyDown={keydown}
            placeholder={queryTexts}
            notFoundContent={null}
            onChange={handleChange}
          >
            {searchlist}
            {searchlistPeo}
          </Select>
        </div>
      </div>
      <div className={style.selectItem}>
        {filterProjectStage()}
        {filterRender()}
        {newWebsocket == true ? (<div onClick={()=>{initShowAll();}} className={style.webScokteAbsolute}>
          有新数据
        </div>) : ''}
      </div>
    </div>
  );
};

export default TopSelect;
