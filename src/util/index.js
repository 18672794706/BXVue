/**
 * 获取所在的平台
 */
export function usePlatForm() {
    let platForm = navigator.platform.toLowerCase();
    if (platForm.indexOf("win32") >= 0 || platForm.indexOf("wow32") >= 0) {
        return "Windows"
    } else if (platForm.indexOf("win64") >= 0 || platForm.indexOf("wow64") >= 0) {
        return "Windows"
    } else {
        return "Mac"
    }
}
/**
 * 是否为移动端
 */
export function useApp() {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag === null) {
        return false
    } else {
        return true
    }
}
/**
 * 时间格式化
 */
export function useTimeFormatter(val) {
    let date = new Date(val)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10)
        month = `0${month}`;
    let day = date.getDate();
    if (day < 10)
        day = `0${day}`;
    let hour = date.getHours();
    if (hour < 10)
        hour = `0${hour}`;
    let mint = date.getMinutes();
    if (mint < 10)
        mint = `0${mint}`;
    let sm = date.getSeconds();
    if (sm < 10)
        sm = `0${sm}`;
    return `${year}-${month}-${day} ${hour}:${mint}:${sm}`
}

export function useChangetime(time) {
    var dateTimeStamp = new Date(time).getTime()
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;

    var month = day * 30;
    var year = month * 12;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    var result = ""
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var yearC = diffValue / year
    if (yearC >= 1) {
        return "" + parseInt(yearC) + "年前";
    }
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }

    return result;

}