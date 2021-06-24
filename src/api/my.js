import request from '../util/request.js'
import url from './url.js'
const myApi = {
    /**
     * 获取新消息通知的设置
     */
    getNewSetting() {
        return request({
            url: url.getNewSetting,
            method: 'GET'
        })
    },
    /**
     * 保存新消息通知的设置
     * @param {rejectedNotifys} 选择的消息设置名称 
     */
    saveNewsSetting(rejectedNotifys) {
        return request({
            url: url.saveNewSetting,
            method: 'GET',
            params: {
                rejectedNotifys: rejectedNotifys
            }
        })
    },
    /**
     * 获取外出设置
     */
    getOutSetting() {
        return request({
            url: url.getOutSetting,
            method: 'GET',
            params: {
                _dc: new Date().getTime()
            }
        })
    },
    /**
     * 保存外出设置
     * @param {type}} 类型，0 无外出，1 含有外出
     * @param {state} 状态 
     * @param {startime} 外出开始时间  
     * @param {endtime} 外出结束时间  
     */
    saveOutSetting(type, state, startime, endtime) {
        let parmars = {}
        if (type === 0) {
            parmars = {
                _dc: new Date().getTime(),
                Method: 'SetOutOfOffice',
                state: state
            }
        } else {
            parmars = {
                _dc: new Date().getTime(),
                Method: 'SetOutOfOffice',
                state: state,
                DateFrom: startime,
                DateTo: endtime
            }
        }
        return request({
            url: url.saveOutSetting,
            method: 'GET',
            params: parmars
        })
    },
    /**
     * 获取所有可以联系的客服
     */
    getAllContact() {
        return request({
            url: url.getServiceConact,
            method: 'GET',
            params: {
                method: 'GetAllContacts',
                _dc: new Date().getTime(),
                product: 'BPM',
                page: 1,
                start: 0,
                limit: 50
            }

        })
    }

}
export default myApi