/**
 * 解析 URL 中的参数为 JSON
 * @param  {[type]} searchString [description]
 * @return {[type]}              [description]
 */
export function searchToObject(search) {
  return search.substring(1).split("&").reduce(function(result, value) {
    var parts = value.split('=');
    if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    return result;
  }, {})
}

/**
 * 下面使用方式
 *  let searchObj = searchToObject(window.location.search);
 *  let applyId = searchObj.applyId ;
 *  let status = searchObj.status;
 *  
 */


export function getQueryString (name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}

/**
 * 下面使用方式
 *  let id = getQueryString("id")
 *  
 */
