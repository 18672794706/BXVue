import request from '../util/request.js'
import url from './url.js'
import Qs from 'qs'
const loginApi = {
    getpublishKey() {
        return request({
            url: url.getPublishKey
        })
    },
    userLogin(userName, password, platform, isapp) {
        const na = "N/A"
        return request({
            url: url.userLogin,
            method: "POST",
            data: {
                method: 'Login',
                uid: userName,
                platform: platform,
                pwd: password,
                isapp: isapp,
                cordova: na,
                name: na,
                model: na,
                version: na,
                manufacturer: na,
                serial: na,
                lang: 'zh-cn',
                uuid: 'anonymous',
                validationPanelShow: false,
                isVirtual: false
            },
            transformRequest: [function (config) {
                return Qs.stringify(config)
            }]
        })
    },
    /**
     * 获取当前登录的用户信息
     */
    getUserInfo() {
        return request({
            url: url.getUserInfo,
            method: 'GET',
            params: {
                method: 'GetUserInfo'
            }
        })
    },
    logOut(pushuuid) {
        return request({
            url: '/eFlowApp/Services/Logout.ashx',
            method: 'GET',
            params: {
                method: 'LogoutMethod',
                pushuuid: pushuuid
            }
        })
    },
}
export default loginApi