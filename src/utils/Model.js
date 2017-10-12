import validTools from "./Valid";
import {update,toImmut} from "./Tools";

/**
验证规则:
	valid示例
	const validConfig = {
		userName:["描术名",["nickName"],'required','name',{type:'ajax',uri:dataService.checkUserName},/^[A-Za-z][A-Za-z0-9]{5,9}$/,function(){return true;}]
	}
	
	验证规则配置说明:
		如果遇到数组，如["nickName"]，则自动转化成ajax与function的入参内容
		
		required为必填字段说明
		
		正则表达式验证，则直接将正则放在数组中
		
		ajax如示例设计，包含type与uri
		
			function验证会把数组中的数据传入，返回true表示验证通过，返回字符串表示验证不通过，并设置为验证失败原因说明,false表示验证失败，格式不正确
	
		
		type：支持ajax(参数uri)，支持minLength(参数len),支持maxLength(参数len)
*/
export function BaseModule(valid,config){
	//isSingle 设置该Model是否为单例,如果是单例，则把值直接放到state下，否则会创建一个objMap用来存储
	const stateName = config.namespace,isSingle = false||!!config.isSingle;
	//当表单全部验证通过后会触发validSuccName事件的名称
	const validConfig = {},validSucc = config.validSuccName;
	config.state = config.state||{};
	config.state.valids = {};
	config.state.illText = {};
	delete config.validSuccName;
	let classState;
	//将ajax放到最后面
	
	Object.getOwnPropertyNames(valid).map((tmp)=>{
		validConfig[tmp]={ajax:[],other:[],name:valid[tmp].shift()};
		config.state.valids[tmp]=null;
		config.state.illText[tmp]=null;
		
		
		for(let i=0;i<valid[tmp].length;i++){
			if(Array.isArray(valid[tmp][i])){
				validConfig[tmp].params = valid[tmp][i];
				continue;
			}
			//函数验证
			if(valid[tmp][i].type==='ajax'){
				validConfig[tmp].ajax.push(valid[tmp][i]);
			}else{
				//正则验证
				validConfig[tmp].other.push(valid[tmp][i]);
			}
		}
	});
	
	//定义该数据层的模型
	if(!isSingle){
		classState = JSON.stringify(config.state)
		config.state = {};
	}
	
	config.effects = config.effects||{};
	config.reducers = config.reducers||{};
	
	const result = {
		...config,
		effects:{
			/**field:验证字段,params:["其他需要带上的字段名"]*/
			*valid({field,nextType,objId},{call,put,select}){
				let obj = yield select(state => state[stateName]);
				if(!isSingle){
					obj = obj[objId];
				}
				
				const keys = {};
				keys[field] = obj[field];
				let fieldValid = validConfig[field];
				let params = fieldValid.params;
				//相关字段收集
				params!=null&&params.map((cur)=>{keys[cur]=obj[cur];})
				//1.正则和函数验证
				let flag = validTools.valids(keys[field],fieldValid.other,keys);
				let status = (flag===true)?"success":"error",
					text=(flag===true)?null:fieldValid.name+((typeof flag==='string')?flag:"格式不正确");
				flag = (flag===true);
				if(flag === true&&fieldValid.ajax.length > 0){
					//需要ajax验证
					//验证通过在继续ajax验证
					yield put({type:"setValidStatus",field,status:'validating',text:"后台验证中...",objId});
					let result;
					for(let i=0;i<fieldValid.ajax.length;i++){
						result = yield call(fieldValid.ajax[i].url,keys);
						if(result==null||result.errorNo!=0){
							flag = false;
							status = "error";
							text = result==null?"网络请求失败":result.msg;
							break;
						}
					}
				}
				
				yield put({type:"setValidStatus",field,status,text,objId});
				if(nextType!=null){
					yield put({type:nextType,objId})
				}
			},
			//表单验证，验证通过后，会触发接下来的事件
			*formValid({fields,objId},{put,call,select}){
				fields = fields||Object.getOwnPropertyNames(validConfig);
				let statusMap;
				if(isSingle){
					statusMap = yield select(state => state[stateName].valids);
				}else{
					statusMap = yield select(state => state[stateName][objId].valids);
				}
				
				const errList = Object.getOwnPropertyNames(statusMap).filter((fieldName)=>{
					if(statusMap[fieldName]===null||statusMap[fieldName]==='error'){
						return true;
					}
					return false;
				});
				
				if(errList.length == 0){
					if(validSucc!=null){
						const allData = yield select(state => state[stateName]);
						let data = isSingle?{...allData}:{...allData[objId]};
						delete data.valids;
						delete data.illText;
						yield put({type:validSucc,data});
					}
				}else{
					let vfield = null;
					for(let i=0;i<errList.length;i++){
						if(statusMap[errList[i]]==null){
							vfield = errList[i];
							break;
						}
					}
					vfield!=null&&(yield put({type:'valid',field:vfield,nextType:'formValid',objId}));
				}
			},
			*setWithValid({props,field},{put}){
				yield put({type:"setState",props});
				yield put({type:"valid",field});
			},
			...config.effects
		},
		reducers: {
	    setState(state,{objId,props}){
	    	props.map((arr)=>{arr.unshift(objId);});
	    	const modify = toImmut(props);
	    	return update(state,modify);
	    },
	    setValidStatus(state,{objId,field,status,text}){
	    	const modify = toImmut([[objId,"valids",field,"$set",status],[objId,"illText",field,"$set",text]]);
	    	return update(state,modify);
	    },
	    resetInitProps(state,action){
	    	if(isSingle)throw new Error("单例直接设置值");
	    	//主要解决有一部分数据来源于subscriptions
	    	delete action.type;
	    	classState = JSON.stringify({...JSON.parse(classState),...action});
	    	return {...state};
	    },
	    clone(state,action){
	    	if(isSingle)throw new Error("单例只能具备一个实例");
	    	let objInstance = {};
	    	objInstance[action.objId] = {...JSON.parse(classState),...action};
	    	delete objInstance[action.objId].type;
	    	const modify = toImmut([["$merge",objInstance]]);
	    	return update(state,modify);
	    },
	    remove(state,{objId}){
	    	if(isSingle)throw new Error("单例没有克隆实例需要清除");
	    	delete state[objId];
	    	return {...state};
	    },
	    ...config.reducers
	  }
	}
	//数据清空
	config = null;
	return result;	
}