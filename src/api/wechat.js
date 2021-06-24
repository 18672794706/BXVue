import request from '../utils/request.js'
import url from './url.js'
const wechat = {
    /**
     * 获取微信参数
     */
    getwechatconfig() {
        return request({
            url: url.getwechatconfig,
            method: 'GET',
            hideloading: true,
            params: {
                method: 'GetWxCropId'
            }
        })
    },
    /**
     * 微信登录
     */
    wechatlogin(code) {
        return request({
            url: url.wechatlogin,
            method: 'GET',
            hideloading: true,
            params: {
                method: 'WeChatLogin',
                code: code
            }
        })
    },
    /**
   * 微信JSSDK
   */
    wechatjssdk() {
        return request({
            url: url.wechatlogin,
            method: 'GET',
            hideloading: true,
            params: {
                method: 'WeChatJssdk'
            }
        })
    },

}
export default wechat