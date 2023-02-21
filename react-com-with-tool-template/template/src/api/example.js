// import request, {  needRequestHeader } from "../utils/request";

// // 取消收藏债券
// export const unCollectBond = async (query) => {
//   try {
//     const response = await request.delete(
//       '/rest/pc/cps/api/v1/attention',
//       { params: query }
//     )
//     if (response.respCode === '00000000') {
//       return response.text || [];
//     }
//   } catch (e) {
//     return [];
//   }
// };

// // 债券录入(发行计划页)
// export const writeBond = async (query) => {
//   try {
//     const response = await request.post('/rest/pc/cps/api/v1/bond-info-input', query)
//     // console.log("[src/api/releasePlan.js]writeBond", "response", response)
//     if (response.respCode === '00000000') {
//       return response.text || [];
//     }
//   } catch (e) {
//     return [];
//   }
// };

// //债券修改
// export const editBond = async (query) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await request.put('/rest/pc/cps/api/v1/bond-info-input', query);
//       // console.log("[src/api/releasePlan.js]editBond", "editBondResponse", response)
//       if (response.respCode === '00000000') {
//         resolve(response.text || []);
//       } else {
//         reject(null)
//       }
//     } catch (e) {
//       reject(null)
//     }
//   })
// };

// // 买方债券公告
// export const bondAnnouncement = async (query) => {
//   try {
//     const response = await request.put('/rest/pc/cps/api/v1/buyer-bond-announcement', query);
//     // console.log("[src/api/releasePlan.js]bondAnnouncement", "response", response)
//     if (response.respCode === '00000000') {
//       return response.text || [];
//     }
//   } catch (e) {
//     return [];
//   }
// };

// // 查询当前债券的工作流（未使用！）
// export const workflowProcess = async (query) => {
//   try {
//     const response = await request({
//       url: '/rest/pc/cps/api/v1/bid/workflow/process',
//       method: 'get',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       params: query,
//     })
//     if (response.respCode === '00000000') {
//       return response.text || [];
//     }
//   } catch (e) {
//     return [];
//   }
// };

// /**
//  * 查询机构信息（未做防抖啊～ 加上了～）
//  * */
// export const queryInstitutions = async (searchName) => {
//   try {
//     const response = await request.get(
//       '/rest/pc/datacenter/api/v1/sdb-institution-info',
//       {
//         params: { 'institutionName': `like:${searchName}`, 'pageInfo.startIndex': 0, 'pageInfo.querySize': 10 },
//         // params: { 'institutionName': `like:${searchName}`, 'currentPage': 0, 'pageSize': 10 },
//         headers: needRequestHeader,
//       }
//       // { params: query }
//     )
//     // console.log("[src/api/releasePlan.js]queryInstitutions", "queryInstitutions", response)
//     if (response.respCode === '00000000') {
//       return response || {};
//     }
//   } catch (e) {
//     return [];
//   }
// };