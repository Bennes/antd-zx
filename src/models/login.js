import { message } from 'antd';
import {BaseModule} from "../utils/Model";
import * as commonService from '../services/common';
import * as loginService from '../services/login';
import {md5} from "../utils/md5";
import Cookies from "../utils/Cookie";
const validConfig = {
	userName:["用户名",'required','name'],
	pwd:["密码",'required',{type:'minLength',len:6}]
}
const overtime = 31536000000;
export default new BaseModule(validConfig,{
  namespace: 'login',
	validSuccName:"submit",
	isSingle:true,
  state: {
  	winHeight:window.innerHeight,
  	userName:Cookies.get("userName"),
  	pwd:Cookies.get("pwd"),
  	//每次随机密钥
  	prdKey:null,
  	submit:false,
  	inputPwd:false,
  	remember:Cookies.get("userName")!=null
  },

  subscriptions: {
    setup({ dispatch, history }) {
    	function listen(){
    		dispatch({type:"setState",props:[["winHeight","$set",window.innerHeight]]});	
    	}
    	window.addEventListener('resize',listen);
    	dispatch({type:"fetchPrdkey"});
    	return ()=>{window.removeEventListener(listen)};
    }
  },

  effects: {
  	*submit({data},{put,call,select}){
  		let pwdCookies;console.log(data);
  		if(data.inputPwd){
  			pwdCookies = md5(data.pwd);
  		}else{
  			pwdCookies = data.pwd;
  		}
  		data.pwd = md5(pwdCookies+data.prdKey);
  		yield put({type:"setState",props:[["submit","$set",true]]});
  		let result = yield call(loginService.login,{loading:"正在登录中",body:{userName:data.userName,pwd:data.pwd}});
  		if(result.errorNo==0){
	  		if(data.remember){
	  			Cookies.set('userName',data.userName,overtime);
	  			Cookies.set('pwd',pwdCookies,overtime);
	  		}else{
	  			Cookies.delete('userName');
	  			Cookies.delete('pwd');
	  		}
  			//进行界面跳转
  			message.success("登录成功");
  			window.location.href="./main.html";
  		}else{
  			yield put({type:"setState",props:[["submit","$set",false]]});
  			if(result.errorNo==-3){
  				yield put({type:"fetchPrdkey",nextType:"formValid",nextParams:{nextType:"submit"}});
  			}else{
  				message.error(result.msg);
  			}
  		}
  	},
  	*fetchPrdkey({nextType,nextParams},{call,put}){
  		let result = yield call(commonService.fetchPrdKey,{});
  		yield put({type:"setState",props:[["prdKey","$set",result.data]]});
  		if(nextType!=null){
  			yield put({type:nextType,...nextParams});
  		}
  	}
  },

  reducers: {
  }

});
 