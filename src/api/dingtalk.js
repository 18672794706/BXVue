import request from '../util/request.js'
import url from './url.js'
const Dingtalk = {
    /**
     * 获取钉钉参数
     */
     getdingtalkconfig() {
        return request({
            url: url.getdingtalkconfig,
            method: 'GET',
            hideloading: true,
            params: {
                method: 'GetDingtalkConfig'
            }
        })
    },
    /**
     * 钉钉登录
     */
     dingtalklogin(code) {
        return request({
            url: url.dingtalklogin,
            method: 'GET',
            hideloading: true,
            params: {
                method: 'DingtalkLogin',
                code: code
            }
        })
    },
    /**
   * 微信JSSDK
   */
    dingtalkjssdk() {
        return request({
            url: url.dingtalklogin,
            method: 'GET',
            hideloading: true,
            params: {
                method: 'DingtalkJssdk'
            }
        })
    },

}
export default Dingtalk