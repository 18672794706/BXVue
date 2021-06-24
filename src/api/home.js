import request from '../util/request.js'
import url from './url.js'
const homeApi = {
    /**
     * 获取我的常用流程
     */
    getMyProcess() {
        return request({
            url: url.getMyCollection,
            method: 'GET'
        })
    },
    /**
     * 添加流程到收藏
     * @param {processName}} 流程名称 
     */
    addProcess(processName) {
        return request({
            url: url.addProcess,
            method: 'GET',
            params: {
                resId: processName,
                resType: 'Process'
            }
        })
    },
    /**
     * 获取首页空间
     */
    getHomeSpance() {
        return request({
            url: url.getHomeSpance,
            method: 'get',
            params: {
                method: 'GetHomeMenus'
            }
        })
    },
    /**
     * 获取指定菜单下的数据
     * @param {PID}} 父级菜单ID
     */
    getHomeSpanceByPID(pid) {
        return request({
            url: url.getHomeSpance,
            method: 'get',
            params: {
                method: 'GetHomeMenusByPID',
                PID: pid
            }

        })
    }
}
export default homeApi