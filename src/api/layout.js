import request from '../util/request.js'
import url from './url.js'
const layOutApi = {
    getColor() {
        return request({
            url: url.getTabBarColor,
            method: 'GET'
        })
    },
    getTabData() {
        return request({
            url: url.getTabBarList,
            method: 'GET'
        })
    },
    getSwiper() {
        return request({
            url: url.getSwiperList,
            method: 'GET'
        })
    }


}
export default layOutApi