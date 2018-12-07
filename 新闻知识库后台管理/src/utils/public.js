// 公共js文件处理逻辑
import { Message } from "element-ui"  // 弹框组件
const errorCode = (result) => {
    return new Promise((resolve, reject) => {
        if (result.code == "0000" || result.code == "0") {
            resolve(result.code);
        } else {
            Message({
                message: result.msg,
                type: "warning"
            })
            reject();
        }
    })
}
const errorCodeData = (code, message, fn) => {
    return new Promise((resolve, reject) => {
        if (code == '1') {
            resolve(code);
        } else {
            Message({
                message: message,
                type: "warning"
            })
            fn();
        }
    })
}
//  封装 localstorage
const Localstorage = () => {
    let storage = window.localStorage;
    if (!window.localStorage) {
        Message({
            message: "浏览器不支持localstorage",
            type: "warning"
        })
        return false;
    }
    // 存储
    let set = (key, value) => {
        storage.setItem(key, JSON.stringify(value));
    }
    // 读取
    let get = (key) => {
        let getData = storage.getItem(key);
        getData = JSON.parse(getData);
        return getData;
    }
    // 删除
    let clear = (key) => {
        storage.removeItem(key);
    }
    return {
        set: set,
        get: get,
        clear: clear
    }
}
//  封装 sessionstorage
const Sessionstorage = () => {
    let storage = window.sessionStorage;
    if (!window.sessionStorage) {
        Message({
            message: "浏览器不支持sesssionstorage",
            type: "warning"
        })
        return false;
    }
    // 存储
    let set = (key, value) => {
        storage.setItem(key, JSON.stringify(value));
    }
    // 读取
    let get = (key) => {
        let getData = storage.getItem(key);
        getData = JSON.parse(getData);
        return getData;
    }
    // 删除
    let clear = (key) => {
        storage.removeItem(key);
    }
    return {
        set: set,
        get: get,
        clear: clear
    }
}
// 查找某一个节点的递归函数,并执行回调函数
const lookupKBNodeId = (nodes, kbnodeId) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].kbnodeId == kbnodeId) {
                resolve(nodes[i]);
                break;
            } else {
                lookupKBNodeId(nodes[i].nodes, kbnodeId);
            }
        }
    })
}
// 比较俩个对象是否相同
function isObj(object) {
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}
function isArray(object) {
    return object && typeof (object) == 'object' && object.constructor == Array;
}
function getLength(object) {
    var count = 0;
    for (var i in object) count++;
    return count;
}
function CompareObj(objA, objB, flag) {
    for (var key in objA) {
        if (!flag) {
            break;
        }
        if (!objB.hasOwnProperty(key)) {
            flag = false;
            break;
        }
        if (!isArray(objA[key])) { //子级不是数组时,比较属性值
            if (objB[key] != objA[key]) {
                flag = false;
                break;
            }
        } else {
            if (!isArray(objB[key])) {
                flag = false;
                break;
            }
            var oA = objA[key],
                oB = objB[key];
            if (oA.length != oB.length) {
                flag = false;
                break;
            }
            for (var k in oA) {
                if (!flag) {
                    break;
                }
                flag = CompareObj(oA[k], oB[k], flag);
            }
        }
    }
    return flag;
}
const Compare = (objA, objB) => {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true); //默认为true
}
// 获取 cookie 数据
export const getCookie = (name) => {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
    var d = new Date();
    d.setTime(d.getTime() + (expiredays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = c_name + "=" + escape(value) + ";" + expires;
};

// export const setCookie = (name, value) => {
//     var Days = 1;
//     var exp = new Date();
//     exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
//     document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
// }

// 字节换算
export const byteConversion = (limit) => {
    let size = "";
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) { //如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    let sizestr = size + "";
    let len = sizestr.indexOf("\.");
    let dec = sizestr.substr(len + 1, 2);
    if (dec == "00") { //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}
// 根据后缀 区分 稿件类型
const suffixType = (suffix) => {
    let suffixType = {
        "jpg": "Photo",
        "jpeg": "Photo",
        "png": "Photo",
        "bmp": "Photo",
        "webp": "Photo",
        "gif": "Gif",
        "mp4": "Video",
        "mkv": "Video",
        "avi": "Video",
        "ts": "Video",
        "flv": "Video",
        "rmvb": "Video",
        "rm": "Video",
        "mov": "Video",
        "wmv": "Video",
        "mpeg": "Video",
        "mp3": "Audio",
        "wav": "Audio",
        "s48": "Audio",
        "aac": "Audio",
        "m4a": "Audio",
        "etc": "Audio",
        "doc": "Text",
        "docx": "Text",
        "xls": "Text",
        "xlsx": "Text",
        "ppt": "Text",
        "pptx": "Text",
        "ai": "Graph",
        "cdr": "Graph",
        "psd": "Graph"
    }
    let mediaType = null;
    for (let item in suffixType) {
        if (item == suffix) {
            mediaType = suffixType[item];
        }
    }
    return mediaType;
}
// 根据附件类型 区分 附件类型参数
const attachmentType = (mediaType) => {
    let attachmentType = {
        "Photo": 2,
        "Video": 8,
        "Audio": 14,
        "Graph": 5,
        "Text": 7
    }
    let attachType = null;
    for (let item in attachmentType) {
        if (item == mediaType) {
            attachType = attachmentType[item];
        }
    }
    return attachType;
}

// 获取时间函数
export const formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
export default {
    errorCode,
    errorCodeData,
    Localstorage,
    Compare,
    lookupKBNodeId,
    Sessionstorage,
    getCookie,
    setCookie,
    byteConversion,
    suffixType,
    attachmentType,
    formatDate
}
