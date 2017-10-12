import request from '../utils/request';
import ctxPath from './ctxPath';

export function checkUserName({userName}) {
  return request(`${ctxPath}/sys/user/check.do?userName=${userName}`,{valid:true});
}

export function register({loading,body}) {
  return request(`${ctxPath}/sys/user/reg.do`,
  	{loading,
  		headers:{'Content-Type': 'application/json'},
  		method: 'POST',body:JSON.stringify(body)});
}