import request from '../util/request.js'
import url from './url.js'
const workApi = {
    /**
     * 获取任务列表[暂时不考虑用axios.all并发请求]
     * @param {当前页码值} pageIndex 
     * @param {每次加载的记录数} pageSize 
     */
    getTaskList(pageIndex, pageSize, search) {
        let starIndex = (pageIndex - 1) * pageSize;
        return request({
            url: url.getTaskList,
            method: 'GET',
            hideloading: pageIndex > 1 ? true : false,
            params: {
                method: 'GetWorkList',
                page: pageIndex,
                limit: pageSize,
                start: starIndex,
                _dc: new Date().getTime(),
                byYear: search.byYear,
                status: search.status,
                processName: search.processName,
                sn: search.sn,
                keyword: search.keyword,
                reqStart: search.reqStart,
                reqEnd: search.reqEnd
            }
        })
    },
    /**
     * 获取代办数量
     * 【[暂时不考虑用axios.all并发请求]】
     */
    getTaskCount() {
        return request({
            url: url.getTaskList,
            method: 'GET',
            params: {
                method: 'GetTaskCount',
                _dc: new Date().getTime()
            }
        })
    },
    /**
     * 获取共享池数据
     */
    getShareTask(pageIndex, pageSize, search) {
        let starIndex = (pageIndex - 1) * pageSize;
        return request({
            url: url.getTaskList,
            method: 'GET',
            hideloading: pageIndex > 1 ? true : false,
            params: {
                method: 'GetShareTasks',
                page: pageIndex,
                limit: pageSize,
                start: starIndex,
                _dc: new Date().getTime(),
                byYear: search.byYear,
                status: search.status,
                processName: search.processName,
                sn: search.sn,
                keyword: search.keyword,
                reqStart: search.reqStart,
                reqEnd: search.reqEnd
            }
        })
    },
    /**
     * 
     * @param {查询已审批数据} 查询已审批数据 
     */
    getHistoryTask(pageIndex, pageSize, search) {
        let starIndex = (pageIndex - 1) * pageSize;
        return request({
            url: url.getTaskList,
            method: 'GET',
            hideloading: pageIndex > 1 ? true : false,
            params: {
                method: 'GetHistoryTasks',
                HistoryTaskType: 'MyProcessed',
                page: pageIndex,
                limit: pageSize,
                start: starIndex,
                _dc: new Date().getTime(),
                byYear: search.byYear,
                status: search.status,
                processName: search.processName,
                sn: search.sn,
                keyword: search.keyword,
                reqStart: search.reqStart,
                reqEnd: search.reqEnd
            }
        })
    },
    /**
     * 获取我的申请
     * @param {pageIndex} pageIndex 
     * @param {pageSize} pageSize 
     * @param {search} search 
     */
    getMyApplyTask(pageIndex, pageSize, search) {
        let starIndex = (pageIndex - 1) * pageSize;
        return request({
            url: url.getTaskList,
            hideloading: pageIndex > 1 ? true : false,
            method: 'GET',
            params: {
                method: 'GetHistoryTasks',
                HistoryTaskType: 'MyRequest',
                page: pageIndex,
                limit: pageSize,
                start: starIndex,
                _dc: new Date().getTime(),
                byYear: search.byYear,
                status: search.status,
                processName: search.processName,
                sn: search.sn,
                keyword: search.keyword,
                reqStart: search.reqStart,
                reqEnd: search.reqEnd
            }
        })
    }
}
export default workApi