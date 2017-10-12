import request from '../utils/request';
import ctxPath from './ctxPath';

export function login({loading,body}) {
  return request(`${ctxPath}/sys/login.do`,
  	{loading,
  		headers:{'Content-Type': 'application/json'},
  		method: 'POST',body:JSON.stringify(body)});
}