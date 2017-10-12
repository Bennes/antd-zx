import fetch from 'dva/fetch';
import { message } from 'antd';

function parseJSON(response) {
	return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
  	//获取头部信息
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
	let hide = null;
	if(options.loading!=null){
		hide = message.loading(options.loading, 0);
	}
	options.credentials="same-origin";
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
			if(hide!=null){
				setTimeout(hide, 300);
			}
			let flag = true;
			
			
			//0:正常,-2:验证异常
    	if(!(data instanceof Array)&&data.errorNo!=0){
    		flag = false;
				if(options.ignore!=null&&(","+options.ignore+",").indexOf(","+data.errorNo+",")>-1){
					flag = true;
				}
    		if(flag||options.valid!==true){
    			flag = true;
    		}
			}
			if(!flag){
				message.error("数据加载异常:"+data.msg, 3);
			}			
    	return data
    }).catch(err => {
			if(hide!=null){
				setTimeout(hide, 300);
			}
			if(options.valid!==true){
    		message.error(err.message, 3);
    	}
    });
}