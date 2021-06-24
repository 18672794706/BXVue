const url = {
    /**
     * 获取公钥
     */
    getPublishKey: `/emip/eFlowApp/Services/Auth.ashx?method=GetPublicKey&_dc=${new Date().getTime()}`,
    /**
     * 用户授权登录
     */
    userLogin: `/emip/eFlowApp/Services/Auth.ashx?_dc=${new Date().getTime()}`,
    /**
     * 获取我的收藏
     */
    getMyCollection: '/emip/eFlowApp/Services/Process.ashx?method=GetFavoriteProcesses',
    /**
     * 获取最新流程
     */
    getNewProcess: '/emip/eFlowApp/Services/Process.ashx?method=GetRecentlyProcess',
    /**
     * 移动流程
     */
    moveProcess: '/emip/eFlowApp/Services/Favorite.ashx?method=MoveFavorites',
    /**
     * 获取任务数据列表
     */
    getTaskList: '/emip/eFlowApp/Services/TaskList.ashx',
    /**
     * 取消收藏
     */
    cancleProcess: '/emip/eFlowApp/Services/Favorite.ashx',
    /**
     * 添加收藏
     */
    addProcess: '/emip/eFlowApp/Services/Favorite.ashx?method=AddFavorite',
    /**
     * 获取用户信息
     */
    getUserInfo: '/emip/eFlowApp/Services/User.ashx',
    /**
     * 获取个人-新消息通知
     */
    getNewSetting: '/emip/eFlowApp/Services/Personal.ashx?method=GetCurrentNotificationSetting',
    /**
     * 保存个人-新消息通知
     */
    saveNewSetting: '/emip/eFlowApp/Services/Personal.ashx?method=SaveNotificationSetting',

    /**
     * 获取外出设置
     */
    getOutSetting: '/emip/eFlowApp/Services/User.ashx?Method=GetOutOfOffice',
    /**
     * 保存外出设置
     */
    saveOutSetting: '/emip/eFlowApp/Services/User.ashx',
    /**
     * 获取所有可以联系的客服
     */
    getServiceConact: '/emip/eFlowApp/Services/ServiceCenter.ashx',
    /**
     * 获取组织树
     */
    getOrgTree: '/emip/eFlowApp/Services/Org.ashx?method=GetOrgTreeByUser',
    /**
     * 根据部门获取人员
     */
    getUserByOrg: '/emip/eFlowApp/Services/Org.ashx?method=GetOrgTreeByUser',
    /**
     * 查询人员
     */
    searchUserByOrg: '/emip/eFlowApp/Services/Org.ashx?Method=GetSearchUsers',
    /**
     * 查询发起选项卡数据
     */
    getProcessThree: '/emip/eFlowApp/Services/loadpostlist.ashx?method=GetProcessTree',
    /**
     * 查询流程
     */
    searchProcess: '/emip/eFlowApp/Services/Process.ashx?method=SearchProcess',
    /**
     * 获取底部标签栏的颜色
     */
    getTabBarColor: '/emip/eFlowApp/Services/BMenu.ashx?method=GetColor',
    /**
     * 获取底部选项卡
     */
    getTabBarList: '/emip/eFlowApp/Services/BMenu.ashx?method=GetMenus',
    /**
     * 获取幻灯片
     */
    getSwiperList: '/emip/eFlowApp/Services/BMenu.ashx?method=GetSwiper',
    /**
     * 获取首页空间
     */
    getHomeSpance: '/emip/eFlowApp/Services/HomeSpace.ashx',

    /**
     * 获取微信配置
     */
     getwechatconfig: '/emip/eFlowApp/Services/wechat.ashx',

       /**
     * 微信登录
     */
      wechatlogin: '/emip/eFlowApp/Services/wechat.ashx',

    /**
     *  获取钉钉配置
     */
     getdingtalkconfig: '/emip/eFlowApp/Services/dingtalk.ashx',
   /**
     * 钉钉登录
     */
    dingtalklogin: '/emip/eFlowApp/Services/dingtalk.ashx',


}
export default url