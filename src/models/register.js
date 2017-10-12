import { message,Modal } from 'antd';
import {BaseModule} from "../utils/Model";

import {md5} from "../utils/md5";
import tools from "../utils/Tools";
import * as dataService from '../services/register';

const validConfig = {
	userName:["用户名",'required','name',{type:'ajax',url:dataService.checkUserName}],
	pwd:["密码",'required',{type:'minLength',len:6}],
	checkPwd:["确认密码",["pwd"],'required',{type:'minLength',len:6},function({pwd,checkPwd}){return pwd!=checkPwd?"与密码不一致":true}],
	nickName:["昵称",'required','noSpecialChar'],
	email:["邮箱",'required','email']
}

export default new BaseModule(validConfig,{
  namespace: 'register',
	validSuccName:"submit",
	isSingle:true,
  state: {
  		userName:null,
  		pwd:null,
  		checkPwd:null,
  		nickName:null,
  		name:null,
  		email:null,
  		submit:false
  },

  effects: {
  	*submit({data},{put,call,select}){
  		yield put({type:'setState',props:[["submit","$set",true]]});
  		delete data.submit;
  		delete data.checkPwd;
  		data.pwd = md5(data.pwd);
  		let result = yield call(dataService.register,{loading:"正在注册中",body:data});
  		if(result.errorNo!=0){
  			yield put({type:'setState',props:[["submit","$set",false]]});
  		}else{
  			Modal.success({
			    title: '注册成功',
			    content: '恭喜注册成功,确认后跳转至登录界面',
			    okText:"确认",
			    onOk() {
		  			//进入返回登录页
		  			window.location.href = './main.html';
			    }
			  });
  		}
  	}
  }
});
 