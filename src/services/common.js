import request from '../utils/request';
import ctxPath from './ctxPath';



export function fetchPrdKey({}) {
  return request(`${ctxPath}/sys/common/key.do`,{});
}
