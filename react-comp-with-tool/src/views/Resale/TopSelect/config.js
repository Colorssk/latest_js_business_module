// 相关常量;体量较大动态数据;参照值
import Moment from 'moment';
export const config = (bondType = () => {}) => {
  return {
    //产品
    product: [ {
      title: '全部',
    },
    {
      title: '国债',
      filterValue: bondType('国债'),
    },
    {
      title: '央票',
      filterValue: bondType('央票'),
    },
    {
      title: '金融债',
      filterValue: bondType('金融债'),
    },
    {
      title: '地方债',
      filterValue: bondType('地方债'),
    },
    {
      title: '短融',
      filterValue: bondType('短融'),
    },
    {
      title: '超短融',
      filterValue: bondType('超短融'),
    },
    {
      title: '中票',
      filterValue: bondType('中票'),
    },
    {
      title: '企业债',
      filterValue: bondType('企业债'),
    },
    {
      title: '公司债',
      filterValue: bondType('公司债'),
    },
    {
      title: 'NCD',
      filterValue: bondType('NCD'),
    },
    {
      title: 'PPN',
      filterValue: bondType('PPN'),
    },
    {
      title: 'ABS',
      filterValue: bondType('ABS'),
    },
    {
      title: '其他',
      filterValue: 1,
    },
    ],
    //债券热门分类
    hotBonds: [
      {
        title: '全部',
      },
      {
        title: '最近上新',
      },
      {
        title: '高撮合空间',
      },
      {
        title: '高费率',
      },
      {
        title: '须通知所有持有人',
      },
      {
        title: '通知持有人参会',
      },
    ],
    //期限
    deadLine:[ {
      title: '全部',
      filter: (bondData) => {
        return bondData;
      }
    }, {
      title: '1M',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '3M',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '6M',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '9M',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '1Y',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '3Y',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '5Y',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '7Y',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '10Y',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '>10Y',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }
    ],
    //主体
    body: [ {
      title: '全部',
      filter: (bondData) => {
        return bondData;
      }
    }, {
      title: 'AAA',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: 'AA+',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: 'AA',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: 'AA-',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: 'A+',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '其他',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }
    ],
    //企业:
    cooporation:[ {
      title: '全部',
      filter: (bondData) => {
        return bondData;
      }
    }, {
      title: '央企',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '国企',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '民企',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }, {
      title: '其他',
      filter: (bondData, i, thisFilter) => {
        return this.filterDataByKeyString(bondData, thisFilter, 'securityDisplayType');
      }
    }
    ]
  };

};
// eslint-disable-next-line no-unused-vars
export const configNoAll = (bondType = () => {}) => {
  return {
    //产品
    projectStage: [ {
      title: '原持有人意向反馈',
    },
    {
      title: '行权前交易期',
    },
    {
      title: '转售收量储备'
    },
    {
      title: '转售交易期'
    },
    ],
  };
};
// 常规filter
export const constData = {
  product:  { title:'产品',paramKey:'bondTypeIds',value:{ '全部': '', '国债': 1, '央票': 2, '金融债': 3, '地方债': 4, '短融': 5, '超短融': 6, '中票': 7, 'PPN': 8, '企业债': 9, '公司债': 10, 'NCD': 12, 'ABS': 11, '其他': 58 } },
  hotBonds:  { title:'热门分类',paramKey:'bondHotSorts',value:{ '全部': '', '最近上新': 'municipal', '高撮合空间': 'coal', '高费率': 'steel', '须通知所有持有人': 'nonenergy', '通知持有人参会': 'energy' } },
  deadLine:{ title:'期限',paramKey:'termUnits', value: { '全部': '', '1M': '1M', '3M': '3M', '6M': '6M', '9M': '9M', '1Y': '1Y', '3Y': '3Y', '5Y': '5Y', '7Y': '7Y', '10Y': '10Y', '>10Y': 'gt10y' } },
  body: { title:'主体',paramKey:'issuerRatingCurrents',value:{ '全部': '', 'AAA': 'AAA', 'AA+': 'AA%2B', 'AA': 'AA', 'AA-': 'AA-', 'A+': 'A%2B', '其他': 'OTE' } },
  cooporation:  { title:'企业',paramKey:'institutionSubtypes',value:{ '全部': '', '央企': 'CGE', '国企': 'LGE', '民企': 'PVE', '其他': 'OTE' } },
  // financialBonds:{ title:'金融债',paramKey:'issuerCodes',value:{ '全部': '', '国开': 'G000124', '口行': 'Z000189', '农发': 'Z000207' } },
  // locationBonds: { title:'地方债',paramKey:'entCor',value:{ '全部': 'ALL', '一般': 'OTH', '专项': 'NMB' } }
};
// filter 没有all
export const filterDataNoTAll = {
  projectStage:  { title:'项目阶段',paramKey:'projectStage',value:{ '包含原持有人意向反馈': 1, '行权前交易期': 2, '转售收量储备': 3, '转售交易期': 4 } },
};

export const select7 = [
  { key: 'ALL', text: '全部' },
  { key: 'OTH', text: '一般' },
  { key: 'NMB', text: '专项' }
];
//初始化queryRef
export const initQueryRef = {
  bondTypeIds: '',
  termUnits: '',
  issuerRatingCurrents:'',
  institutionSubtypes: '',
  issuerCodes: '',
  entCor: 'ALL',
  bondHotSorts: '',
  quotStatus: false,
  underwriter: false,
  organ: false,
  startIndex: 0,
  querySize: 100,
  orderByStr: '',
  asc: false,
  keyOPvalue:'',
  supervisors: '',
  search: '',
  underwriters:'',
  issueStartDateStartDate:  Moment().subtract(1, 'months').format('YYYY-MM-DD').toString(),
  issueStartDateEndDate: Moment().format('YYYY-MM-DD').toString(),
};