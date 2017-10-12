const _isPlainObject = require('is-plain-object').default;
import update from "immutability-helper";

export default {
	isPlainObject:function(obj){
		return _isPlainObject(obj);
	},
	update:(state,props)=>{
		return update(state,props);
	},
	toImmut:(setArr)=>{
		//数组转换成immutability-helper语法
		//[["a","b","c","$set",value],["a","b","c","$push",value]]
		const r = {};
		let tmp,key,value;
		setArr.map((item)=>{
			value = item.pop();
			key = item.pop();
			if(key.indexOf('$')!=0){
				item.push(key);
				key = "$set";
			}
			tmp = item.reduce((pre,cur,idx,arr)=>{
				if(cur==null)return pre;
				if(pre[cur]==null){
					pre[cur]={};
				}
				return pre[cur];
			},r);
			tmp[key]=value;
		});
		return r;
	}
}