import originJSONP from 'jsonp'

//url拼接
export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve,reject) => {
        originJSONP(url, option, (err, data) => {
            //如果请求成功则把返回的数据resolve出去
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })

}

function param(data) {
    let url = ''
    for(var k in data) {
        let value = data[k] != undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}