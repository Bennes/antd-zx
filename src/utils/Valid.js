const validRule = {
	//以字母开头，可以包含数据,并且在6至10位之间
	name:/^[A-Za-z][A-Za-z0-9]{5,9}$/,
	noSpecialChar:/[^@#\$%\^&\*]+/g,
	email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ 
};
/**values：值,config:验证规则*/
function valid(value,config,params){
	let type = typeof config,flag = true;
	switch(type){
		case 'string'://正则规则
			if(config=='required'){
				flag = (value==null||value=='')?"不能为空":true;
			}else if(value==null||value==''){
				flag = true;//内容非空时，验证OK
			}else{
				flag = validRule[config].test(value);
			}
			break;
		case 'function'://函数
			flag = config(params);
			break;
		case 'object'://正则表达式
		 if(value==null||value==''){
				flag = true;//内容非空时，验证OK
			}else if(config.type==null){
				flag = config.test(value);
			}else{
				switch(config.type){
					case "minLength":
						//最小长度
						flag = value.length < config.len?"未达到最小长度":true;
						break;
					case "maxLength":
						//最大长度
						flag = value.length > config.len?"超过最大长度":true;
						break;
				}
			}
			break;
		default:
			break;
	}
	return flag;
}
/**
config:{
	key:['name','required',function(){}]
}


*/
export default {
	valids:function(value,config,params){
		let flag = true;
		for(let i=0;i<config.length;i++){
			flag = valid(value,config[i],params);
			if(flag!==true)break;
		}
		return flag;
	}
}