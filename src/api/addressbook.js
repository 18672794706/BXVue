import request from '../util/request.js'
import url from './url.js'
const bookApi = {
    /**
     * 获取组织树
     */
    getOrgTree() {
        let time = new Date().getTime()
        let urls = `${url.getOrgTree}&_dc=${time}`
        return request({
            method: 'GET',
            hideloading: true,
            url: urls
        })
    },
    /**
     * 获取部门下面的人员
     * @param {node} 部门
     */
    getUserByOrg(node) {
        let urls = `${url.getUserByOrg}&_dc=${new Date().getTime()}&node=${node}`
        return request({
            url: urls,
            hideloading: true,
            method: 'GET'
        })
    },
    /**
     * 查询成员
     * @param {keyword}} 查询关键字 
     */
    searchUserByOrg(keyword) {
        let urls = `${url.searchUserByOrg}&_dc=${new Date().getTime()}&keyword=${keyword}`
        return request({
            url: urls,
            hideloading: false,
            method: 'GET'
        })
    }
}
export default bookApi