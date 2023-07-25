import React, { useState, useCallback, useEffect, useRef } from 'react';
import { message } from 'ss-ui-library';
import { getResaleList } from '@/Api/Resale';
import { useGetDataSource } from './util';
import style from './index.module.less';
import VisTable from './visual-table';
import { useDispatch } from 'redux-react-hook';
// 生成假数据
// const generateNewData = (startIndex = 0) => {
//   return  Array.from({ length: 100 }, (_, i) => ({
//     projectStage: `Row ${startIndex + i + 1}, Column 1`,
//     incomeType: `Row ${startIndex + i + 1}, Column 2`,
//     bondName: `Row ${startIndex + i + 1}, Column 3`,
//     bondCode: `Row ${startIndex + i + 1}, Column 4`,
//     bondFullName: `Row ${startIndex + i + 1}, Column 5`,
//     restTerm: `Row ${startIndex + i + 1}, Column 6`,
//     actionDate: `Row ${startIndex + i + 1}, Column 7`,
//     rate: `Row ${startIndex + i + 1}, Column 8`,
//     releaseScale: `Row ${startIndex + i + 1}, Column 9`,
//     resaleRegPeriod: `Row ${startIndex + i + 1}, Column 10`,
//     resalePeriod: `Row ${startIndex + i + 1}, Column 11`,
//     // 更多的列...
//   }));
// };
const TestTable = () => {
  const [ scroll, setScroll ] = useState(0);
  const [ list, setList ] = useState([]);
  const [ isTriggeringFlag, setIsTriggeringFlag ] =  useState(false);
  const loadOnce = useRef(false);
  let queryRef = useRef({});
  let isReloadTableRef = useRef(false);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const calcTableHeight = useCallback(() => {
    let tes = document.documentElement.clientHeight || document.body.clientHeight;
    let xWidth = (document.documentElement.clientWidth || document.body.clientWidth ) - 180;
    setScroll({ scrollY: tes - 150, scrollX: xWidth });
  }, []);
    // 获取 全局query 
  queryRef.current = useGetDataSource({ key: 'queryData', nameSpace: 'resale.queryData' })['queryData'] || [];

  // 获取是否重新加载列表
  isReloadTableRef.current = useGetDataSource({ key: 'isReloadTable', nameSpace: 'resale.isReloadTable' })['isReloadTable'];
  useEffect(() => {
    if (loadOnce.current === true){
      console.log('刷新加载----');
      setIsTriggeringFlag(true);
      fetchData({ startIndex: 0 }).then(res=>{
        setList(res);
        tableRef.current.handleScrollToPosition && tableRef.current.handleScrollToPosition(0);
      }).finally(()=>{
        setIsTriggeringFlag(false);
      });
    }
    
  },[ isReloadTableRef.current ]);
  useEffect(() => {
    console.log('第一次加载数据');
    calcTableHeight();
    setIsTriggeringFlag(true);
    fetchData({ startIndex: 0 }).then(res=>{
      // 初始化数据， 第一页数据
      setList(res);
    }).finally(()=>{
      setIsTriggeringFlag(false);
    });
    loadOnce.current = true;
  }, []);
  
  const fetchData = async ({ startIndex }) => {
    return new Promise((resolve, reject)=>{
      getResaleList({ ...queryRef.current, startIndex, querySize: 100 }).then(res=>{
        if(res && res.length > 0) {
          resolve(res);
        }else {
          reject('没有更多数据了');
        }
      });
    });
  };

  const columns = [
    {
      title: '项目阶段',
      dataIndex: 'projStage',
      ellipsis: true,
      minWidth: 110,
      width: 110,
      flexShrink: 0,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
    },
    {
      title: '创收类型',
      dataIndex: 'createIncomeType',
      ellipsis: true,
      minWidth: 110,
      width: 110,
      flexShrink: 0,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val) => {
        return (
          <div title={val}>
            {val || '--'}
          </div>
        );
      },
    },
    {
      title: '债券简称',
      dataIndex: 'shortName',
      ellipsis: true,
      minWidth: 210,
      width: 210,
      flexShrink: 0,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val) => {
        return (
          <div title={val}>
            {val || '--'}
          </div>
        );
      },
    },
    {
      title: '债券代码',
      dataIndex: 'bondId',
      ellipsis: true,
      minWidth: 210,
      width: 210,
      flexShrink: 0,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val) => {
        return (
          <div title={val}>
            {val || '--'}
          </div>
        );
      },
    },
    {
      title: '债券全称',
      dataIndex: 'bondFullName',
      ellipsis: true,
      minWidth: 210,
      width: 210,
      sorter: true,
      flexShrink: 0,
      flexGrow: 0,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val) => {
        return (
          <div title={val}>
            {val || '--'}
          </div>
        );
      },
    },
    {
      title: '剩余期限',
      dataIndex: 'termToMaturity',
      ellipsis: true,
      flexShrink: 0,
      minWidth: 110,
      width: 110,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val) => {
        return (
          <div title={val}>
            {val || '--'}
          </div>
        );
      },
    },
    {
      title: '行权日',
      dataIndex: 'optionDate',
      flexShrink: 0,
      ellipsis: true,
      minWidth: 210,
      width: 210,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val) => {
        return (
          <div title={val}>
            {val || '--'}
          </div>
        );
      },
    },
    {
      title: '主体评级/债项评级',
      dataIndex: 'issuerRatingCurrent',
      flexShrink: 0,
      ellipsis: true,
      minWidth: 160,
      width: 160,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val, row) => {
        return (
          <div title={val}>
            {`${row?.issuerRatingCurrent ?? '--'}/${row?.ratingCurrent ?? '--'}`}
          </div>
        );
      },
    },
    {
      title: '发行规模/转售规模',
      dataIndex: 'issueAmount',
      flexShrink: 0,
      ellipsis: true,
      minWidth: 210,
      width: 210,
      flexGrow: 0,
      sorter: true,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val, row) => {
        return (
          <div title={val}>
            {`${row?.issueAmount ?? '--'}/${row?.resaleIssueAmount ?? '--'}`}
          </div>
        );
      },
    },
    {
      title: '回售登记期',
      dataIndex: 'putStartDate',
      ellipsis: true,
      minWidth: 210,
      width: 210,
      flexGrow: 0,
      sorter: true,
      flexShrink: 0,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val, row) => {
        return (
          <div title={val}>
            {`${row?.putStartDate || ''}--${row?.putEndDate ?? ''}`}
          </div>
        );
      },
    },
    {
      title: '转售期',
      dataIndex: 'resaleDate',
      ellipsis: true,
      minWidth: 210,
      width: 210,
      flexGrow: 0,
      sorter: true,
      flexShrink: 0,
      //   sortOrder: sortedInfo.field === 'bondCode' && sortedInfo.order,
      render: (val) => {
        return (
          <div title={val}>
            {val || '--'}
          </div>
        );
      },
    }
  ];
  const loadMoreFn = (successCallback) => {
    if (loadOnce.current === true){
      console.log('加载更多----');
      setIsTriggeringFlag(true);
      fetchData({ startIndex: queryRef.current.startIndex + 100 }).then(res=>{
        setList([ ...list, ...res ]);
        // 页数下次查询自增startIndex
        successCallback();
      }).catch((info)=>{
        message.info(info);
      }).finally(()=>{
        setIsTriggeringFlag(false);
      });
    }
  };
  // 页数更新
  const handlePaginationUpdate = () => {
    dispatch({
      type: 'SET:resale',
      payload: {
        queryData: { ...queryRef.current, startIndex: queryRef.current.startIndex + 100 },
      }
    });
  };
  const assignRef = (ref) => {
    tableRef.current = ref;
  };
  return (
    <div className={style.testTableContainer}>
      <VisTable
        className={style.tableName}
        columns={columns}
        marginWidth={10}// 参与宽度计算的margin宽度
        scroll={{ y: scroll.scrollY, x: scroll.scrollX }}
        dataSource={list}
        triggleHeight={0}
        loadMoreFn={loadMoreFn}
        isTriggeringFlag={isTriggeringFlag}
        paginationUpdate={handlePaginationUpdate}
        ref={assignRef}
        // onChange={(pagination, filters, sorter) => {
        //   handleTableChange(pagination, filters, sorter);
        // }}
        // onRow={(record) => {
        //   return {
        //     onDoubleClick: () => {
        //       handleShowDetail(record);
        //     },
        //     onClick: () => {
        //       onClickRow(record);
        //     },
        //   };
        // }}
      />
    </div>
  );
};

export default TestTable;