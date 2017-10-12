import React from 'react';
import { connect } from 'dva';
import { Layout,Form, Icon, Input, Button, Checkbox  } from 'antd';
import styles from './RegisterPage.less';
const FormItem = Form.Item;
const { Header,  Content } = Layout;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
class LoginPage extends React.Component{
	constructor(props) {
    super(props);
  }
	render(){
	  return (
		    <Layout>
		      <Header className={styles.heard}>JSON Mock平台:【用户注册】</Header>
		      <Content style={{backgroundColor:'white'}}>
		      	<Form className={styles.formContainer}>
		      		<FormItem {...formItemLayout} label="用户名" required
		      			validateStatus={this.props.valids.userName}
		      			hasFeedback
		      			help={this.props.illText.userName}
		      		>
			           	<Input  placeholder="请输入英文加数字的用户名" onBlur={({target})=>{
			           			this.props.dispatch({
				           			type:"register/setWithValid",
				           			field:'userName',
				           			props:[["userName","$set",target.value]]
				           		});
			           		}}/>
			           	<span className={styles.antFormText}>请用英文开头，请勿使用空格或特殊字符,并且在6至10位之间</span>
			        </FormItem>
		      		<FormItem {...formItemLayout} label="密码" required
		      			validateStatus={this.props.valids.pwd}
		      			hasFeedback
		      			help={this.props.illText.pwd}
		      			>
			           	<Input  type="password" placeholder="请输入密码(至少6位)" onBlur={({target})=>{
			           		this.props.dispatch({
				           			type:"register/setWithValid",
				           			field:'pwd',
				           			props:[
				           				["pwd",target.value]
				           			]
				           		});
			           		}}/>
			           	<span className={styles.antFormText}> 请使用复杂密码</span>
			        </FormItem>
		      		<FormItem {...formItemLayout} label="确认密码" required
		      			validateStatus={this.props.valids.checkPwd}
		      			hasFeedback
		      			help={this.props.illText.checkPwd}
		      		>
			           	<Input  type="password" placeholder="请输入密码(至少6位)"
			           	  onBlur={({target})=>{
			           		this.props.dispatch({
				           			type:"register/setWithValid",
				           			field:'checkPwd',
				           			props:[
				           				['checkPwd',target.value]
				           			]
				           		});
			           		}}/>
			           	<span className={styles.antFormText}> 请重新填写密码</span>
			        </FormItem>
		      		<FormItem {...formItemLayout} label="昵称" required
		      			validateStatus={this.props.valids.nickName}
		      			hasFeedback
		      			help={this.props.illText.nickName}>
			           	<Input placeholder="请输入昵称" onBlur={({target})=>{
			           		this.props.dispatch({
				           			type:"register/setWithValid",
				           			field:'nickName',
				           			props:[
				           				['nickName',target.value]
				           			]
				           		});
			           		}}/>
			        </FormItem>
		      		<FormItem {...formItemLayout} label="邮箱" required
		      			validateStatus={this.props.valids.email}
		      			hasFeedback
		      			help={this.props.illText.email}>
			           	<Input placeholder="test@qq.com" type="email" onBlur={({target})=>{
			           		this.props.dispatch({
				           			type:"register/setWithValid",
				           			field:'email',
				           			props:[
				           				['email',target.value]
				           			]
				           		});
			           		}}/>
			           	<span className={styles.antFormText}> 请填写找回密码邮箱</span>
			        </FormItem>
		      		<FormItem {...formItemLayout} label="姓名">
			           	<Input placeholder="请输入真实姓名" onBlur={({target})=>{
			           		this.props.dispatch({
				           			type:"register/setState",
				           			props:[
				           				['name',target.value]
				           			]
				           		});
			           		}}/>
			        </FormItem>
			        <FormItem wrapperCol={{offset:4}}>
			          <Button type="primary" onClick={
			          	()=>{
			           			this.props.dispatch({
				           			type:"register/formValid",
				           			nextType:"submit"
				           		});
			          	}
			          } loading={this.props.submit}>
			            注册
			          </Button>
			          <Button style={{marginLeft:'25px'}} onClick={()=>{
			          	window.location.href = './index.html';
			          }}>返回</Button>
			        </FormItem>
		      	</Form>
		      </Content>
		    </Layout>
	  );
	}
}

export default connect((state)=>({
	...state.register
}))(LoginPage);
