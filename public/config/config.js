var config = {
    host: '',
    env: 'eFlowWechat'//运行环境(eFloweApp eFlowDingtalk eFlowWechat)
}
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('dingtalk') != -1) {
    config.env= "eFlowDingtalk";
    //alert("钉钉浏览器");
} else if (userAgent.indexOf('micromessenger') != -1) {
    config.env= "eFlowWechat";
    //alert("微信浏览器");
} else if (userAgent.indexOf('uni-app') != -1) {
    config.env= "eFlowApp";
    //alert("微信浏览器");
}else{
    config.env= "HTML5";
}