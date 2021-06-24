import request from '../util/request.js'
import url from './url.js'
const startApi = {
    /**
     * 获取我的收藏
     * @param {参数} 参数 
     */
    getMyCollection(parmars) {
        return request({
            url: url.getMyCollection,
            params: parmars
        })
    },
    /**
     * 获取最新流程
     * @param {parmars} 参数 
     */
    getNewProcess(parmars) {
        return request({
            url: url.getNewProcess,
            params: parmars
        })
    },
    /**
     * 移动流程
     * @param {移动流程} 移动流程 
     */
    moveProcess(parmars, sourceArrys) {
        return request({
            url: url.moveProcess,
            method: 'POST',
            params: parmars,
            data: sourceArrys
        })
    },
    /**
     * 取消流程
     * @param {resid} 流程名称 
     */
    cancleProcess(resid) {
        return request({
            url: url.cancleProcess,
            params: {
                method: 'CancelFavorite',
                resType: 'Process',
                resId: resid,
                _dc: new Date().getTime()
            }
        })

    },
    /**
     * 获取发起选项卡数据
     */
    getStartProcess() {
        return request({
            url: url.getProcessThree,
            method: 'GET'
        })
    },
    /**
     * 查询流程
     * @param {keyword}} 查询条件 
     */
    searchProcess(keyword) {
        return request({
            url: url.searchProcess,
            params: {
                kwd: keyword
            }
        })
    }
}
export default startApi