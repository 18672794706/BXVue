import request from "../utils/request.js";

const Token = window.token || process.env.VUE_APP_TOKEN || "";
const url = "/BXPortal/BXInterface/AppInterface.ashx";

// 获取数据方法 123123
function getdata(Method, method, Data) {
  return request({
    url,
    method,
    params: {
      Method,
      Json: JSON.stringify({
        Token,
        Data,
      }),
    },
    hideloading: true,
  });
}

// 功能列表
export const Pad_GetApplicationCenter = (data = {}) =>
  getdata("Pad_GetApplicationCenter", "post", data);

// 扫码报修-设备扫码获取设备详细信息
export const Pad_EquipmentScanCode = (data = { EquipmentNoDes: "" }) =>
  getdata("Pad_EquipmentScanCode", "post", data);

// 扫码报修-获取部门
export const Pad_EquipmentGetWorkType = (data = {}) =>
  getdata("Pad_EquipmentGetWorkType", "post", data);

// 扫码报修-获取车间
export const Pad_EquipmentGetWorkName = (data = { MaintainWorkType: "" }) =>
  getdata("Pad_EquipmentGetWorkName", "post", data);

// 扫码报修-获取设备
export const Pad_EquipmentGetFailures = (
  data = { MaintainWorkType: "", MaintainWorkName: "" }
) => getdata("Pad_EquipmentGetFailures", "post", data);

// 扫码报修-获取故障类型
export const Pad_EquipmentGetFailure = (data = { EquipmentNo: "", kwd: "" }) =>
  getdata("Pad_EquipmentGetFailure", "post", data);

// 扫码报修-发起报修
export const Pad_EquipmentPost = (
  data = { EquipmentID: "", FaultType: [], UrgentTask: 0, Remarks: "" }
) => getdata("Pad_EquipmentPost", "post", data);

// 任务分配-获取列表
export const Pad_Repair_GetDistributionTask = (
  data = { Page: "", Number: "", KeyWords: "", StartDate: "", EndDate: "" }
) => getdata("Pad_Repair_GetDistributionTask", "post", data);


// 任务分配-获取维修人员
export const Pad_Repair_GetSubordinateUser = (data = { RepairId: "" }) =>
  getdata("Pad_Repair_GetSubordinateUser", "post", data);

// 任务分配-分配任务
export const Pad_Repair_AssignmentTask = (
  data = { TaskId: "", TaskAccount: "" }
) => getdata("Pad_Repair_AssignmentTask", "post", data);

// 个人信息-个人信息详细
export const Pad_PersonalInformation = (data = {}) =>
  getdata("Pad_PersonalInformation", "post", data);

// 个人信息-打开或关闭是否开工按钮
export const Pad_SetStart = (data = { Type: "" }) =>
  getdata("Pad_SetStart", "post", data);

// 个人信息-个人信息详细
export const Pad_SetMessagePush = (data = { Type: "" }) =>
  getdata("Pad_SetMessagePush", "post", data);

// 扫码签到-获取报修详细
export const Pad_EquipmentGetInfo = (data = { EquipmentNoDes: "" }) =>
  getdata("Pad_EquipmentGetInfo", "post", data);

// 扫码签到-确认签到
export const Pad_ScanCodeSignIn = (data = { RepairId: "" }) =>
  getdata("Pad_ScanCodeSignIn", "post", data);

// 报修单订单详细
export const Pad_Repair_GetRepairInfo = (data = { RepairId: "" }) =>
  getdata("Pad_Repair_GetRepairInfo", "post", data);

// 待处理-获取列表
export const Pad_Repair_GetRepairResponse = (
  data = { Page: "", Number: "", KeyWords: "", StartDate: "", EndDate: "" }
) => getdata("Pad_Repair_GetRepairResponse", "post", data);


// 任务移交-获取当前报修单下所有的报修人员
export const Pad_Repair_GetAllRepairMember = (data = { RepairId: "" }) =>
  getdata("Pad_Repair_GetAllRepairMember", "post", data);

