import React from 'react';
import { connect } from 'dva';
import { Layout,Form, Icon, Input, Button, Checkbox  } from 'antd';
import styles from './Login.less';
const FormItem = Form.Item;
const { Header, Footer, Content } = Layout;

class LoginPage extends React.Component{
	constructor(props) {
    super(props);console.log(props);
  }
	render(){
	  return (
		    <Layout>
		      <Header className={styles.heard}>JSON Mock平台</Header>
		      <Content style={{height:(this.props.winHeight-126)+'px',backgroundColor:'white'}}>
		      	<div className={styles.loginContainer}>
		      		<h1 className={styles.title}>JSON Mock平台</h1>
		      		<div className={styles.container}>
			      		<Form className={styles.loginForm}>
					        <FormItem  required
				      			validateStatus={this.props.valids.userName}
				      			help={this.props.illText.userName}
				      		>
					           	<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
					           		placeholder="用户名"
					           		defaultValue={this.props.userName}
					           		onBlur={({target})=>{
					           			this.props.dispatch({
						           			type:"login/setWithValid",
						           			field:'userName',
						           			props:[
						           				["userName","$set",target.value]
						           			]
						           		});
				           		}}/>
					        </FormItem>
					        <FormItem  required
				      			validateStatus={this.props.valids.pwd}
				      			help={this.props.illText.pwd}
				      		>
					            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码"
					            	defaultValue={this.props.pwd}
					              onBlur={({target})=>{
				           			this.props.dispatch({
					           			type:"login/setWithValid",
					           			field:'pwd',
					           			props:[
						           				["pwd","$set",target.value],
						           				["inputPwd","$set",true]
						           		]
					           		});
				           		}} />
					        </FormItem>
					        <FormItem>
					          <Checkbox 
					          	checked={this.props.remember}
					          	onChange={({target})=>{
					          	this.props.dispatch({
					           			type:"login/setState",
					           			props:[
						           				["remember","$set",target.checked]
						           		]
					           		});
					          }}>保存用户名密码</Checkbox>
					          <Button type="primary" className={styles.loginFormButton} onClick={
						          	()=>{
						           			this.props.dispatch({
							           			type:"login/formValid",
							           			nextType:"submit"
							           		});
						          	}
						          } loading={this.props.submit}>
					            登录
					          </Button>
					          或者 <a href="./register.html">注册</a>
					        </FormItem>
					      </Form>
		      			
		      		</div>
		      	</div>
		      </Content>
		      <Footer className={styles.foot}>开发者:曾孝 @2017.09.18</Footer>
		    </Layout>
	  );
	}
}

export default connect((state)=>({
		...state.login,
		...state.top
}))(LoginPage);
