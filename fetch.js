const request = require('request');

function requestData(params, cb) {
    return cb(null);
    let {method, url, data, form, isForm} = params;
    let options = {
        method: method || 'GET',
        url
    };
    if(!options.url){
        return cb(null, {code: 1, data: [], msg: '无效的参数'});
    }
    // request(options, (err, res, body)=> {
        // if (res) {
        //     try{
        //         let {status, data} = JSON.parse(body);
        //         if(status === 0){
        //             cb(null, {code: 0, data, msg: '获取数据成功'});
        //         }else{
        //             cb(null, {code: 1, data: [], msg: '获取数据失败'});
        //         }
        //     }catch(e){
        //         cb(res, body);
        //     }
        // } else {
        //     cb(err, {code: 1, data: [], msg: '解析数据失败'});
        // }
    // });
    request.post({
        url, 
        form
    }, function(err, res, body){
        if (res) {
            try{
                let {status, data} = JSON.parse(body);
                if(status === 0){
                    cb(null, {code: 0, data, msg: '获取数据成功'});
                }else{
                    cb(null, {code: 1, data: [], msg: '获取数据失败'});
                }
            }catch(e){
                cb(res, body);
            }
        } else {
            cb(err, {code: 1, data: [], msg: '解析数据失败'});
        }
    });
}

module.exports = requestData;