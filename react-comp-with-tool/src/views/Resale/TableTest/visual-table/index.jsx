import React from 'react';
import { Column, Table } from 'react-virtualized';
import { Spin } from 'ss-ui-library';
import style from './index.module.less';
import 'react-virtualized/styles.css'; // 如果你需要默认样式

class VisTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalWidth:  this.calTotalWidth(this.props.columns) + (this.props.marginWidth ? (this.props.columns.length - 1) * this.props.marginWidth : 0),
      hoverIndex: -2,
    };
  }
  tableRef = React.createRef();
  calTotalWidth = (columns) => {
    return columns.reduce((total, col) => {
      return total + (Number(col.width) || Number(col.minWidth) || 200);
    }, 0 );
  }
  // 你的排序函数
  sort = ({ sortBy, sortDirection }) => {
    // 实现你的排序逻辑
    console.log('sortBy', sortBy);
    console.log('sortDirection', sortDirection);
  };

  // eslint-disable-next-line no-unused-vars
  cellRenderer = ({ cellData, columnData, dataKey, rowData, rowIndex,colExtraProp }) => {
    // 实现单元格渲染逻辑
    if(colExtraProp?.render && typeof colExtraProp?.render === 'function'){
      return colExtraProp?.render(cellData, rowData, rowIndex);
    } else {
      return <div>{cellData}</div>;
    }
    
  };

  renderColumns = () => {
    const { columns } = this.props;
    return columns.map(col=>{
      return (
        <Column
          key = {col.dataIndex}
          {...col}
          label={((col.title && typeof col.title === 'function') ? col.title() : col.title) || 'unknown'}
          dataKey={col.dataIndex}
          flexShrink={col.flexShrink ?? 1}
          width={col.width || 200}
          cellRenderer={(cellInfo) => this.cellRenderer({ ...cellInfo, colExtraProp: col })}
        />
      );
    });
  }

  handleRowMouseOver = ({ index }) => {
    this.setState({
      hoverIndex: index,
    });
  }

  handleRowClassName = ({ index }) => {
    const { hoverIndex } =  this.state;
    return `tableRowStyle ${this.props?.rowClassName ?? ''} ${(index!==-1 && (index + 2) % 2 !== 1) ? 'stripes' : ''} ${(hoverIndex === index && hoverIndex !== -2) ? 'rowHover' :''} `;
  }

  handleRowMouseOut = () => {
    this.setState({
      hoverIndex: -2,
    });
  }

  handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const { isTriggeringFlag=true, loadMoreFn } = this.props;
    if (scrollHeight - scrollTop <= clientHeight + (this.props.triggleHeight ?? 0) && !isTriggeringFlag) {
      if(loadMoreFn && typeof loadMoreFn === 'function'){
        loadMoreFn(()=>{
          // 页数更新后置
          this.props.paginationUpdate && this.props.paginationUpdate();
        });
      }
    }
  }

  handleScrollToPosition = (top) => {
    console.log('this.tableRef.current.scrollToPosition',this.tableRef.current);
    this.tableRef.current.scrollToPosition && this.tableRef.current.scrollToPosition(top ?? 0);
  }

  render() {
    const { totalWidth } =  this.state;
    return (
      <div className={style.tableWrapper} style={{ width: this.props.scroll.x || 1200, 'overflowY': 'hidden' , position: 'relative' }}>
        {(this.props.loading || this.props.isTriggeringFlag ) && <Spin style={{ position: 'absolute',width: totalWidth, zIndex: 1, overflow:'hidden', background: 'rgba(0,0,0,0.25)' }} spinning={true}></Spin>}
        <Table
          headerClassName={`tableHeader ${this.props?.headerClassName ?? ''}`}
          rowClassName={this.handleRowClassName}
          width={totalWidth ?? 1200}
          height={this.props.scroll.y ?? 400}
          headerHeight={40}
          rowHeight={40}
          ref={this.tableRef}
          rowCount={this.props.dataSource.length}
          rowGetter={({ index }) => this.props.dataSource[index]}
          sort={this.sort}
          onRowMouseOver={this.handleRowMouseOver}
          onRowMouseOut={this.handleRowMouseOut}
          onScroll={this.handleScroll}
        >
          {
            this.renderColumns()
          }
          {/* 更多的列... */}
        </Table>
        
      </div>
    );
  }
}
export default VisTable;