import React from 'react';
import { connect } from 'dva';
import { Tabs, Menu,Layout, Icon,  } from 'antd';
import styles from './MainPage.less';
const { Header, Footer, Content, Sider  } = Layout;
const {MenuItemGroup ,SubMenu} = Menu;
const TabPane = Tabs.TabPane;

class MainPage extends React.Component{
	constructor(props) {
    super(props);
  }
	render(){
	  return (
		    <Layout className={styles.mainContainer}>
		      <Header className={styles.heard}>JSON Mock平台</Header>
		      <Layout style={{minHeight:(this.props.winHeight-126)+'px',backgroundColor:'white',marginTop:"64px"}}>
		      	<Sider width={240} className={styles.topLeftMenu}>
			      	<Menu
				        style={{ width: 239 }}
				        defaultSelectedKeys={['1']}
				        defaultOpenKeys={['sub1']}
				        mode="inline"
				        style={{ height: '100%', borderRight: 0 }}
				      >
				        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
				          <Menu.Item key="9"><a href="#/tabs/tab1/test1">test1</a></Menu.Item>
				          <Menu.Item key="10"><a href="#/tabs/tab1/test2">test2</a></Menu.Item>
				          <Menu.Item key="11">
				          	<a href="#/tabs/tab1/test3">test3</a>
				          </Menu.Item>
				          <Menu.Item key="12">
				          	<a href="#/tabs/tab1/test4">test4</a>
				          </Menu.Item>
				        </SubMenu>
				      </Menu>
				     </Sider>
				     	<Content style={{ background: '#fff', padding: 24, margin: 0 }}>
				     		<Tabs activeKey={this.props.activeTab} hideAdd animated={false}
				     		type="editable-card"
				     		 onChange={
				     			(key)=>{
				     				window.location.hash = "#"+key.replace(/_/g,"/");
				     			}
				     		}
				     		onEdit={
				     			(targetKey, action)=>{
				     				if(action!='remove')return;
				     				this.props.dispatch({
				     					type:"top/removeTab",
				     					tabId:targetKey
				     				});
				     				
				     			}
				     		}
				     		>
				     			{
				     				this.props.tabs.map((item,idx)=>{
				     					const Comp = item.comp;
				     					return <TabPane tab={item.name}
				     						 key={item.tabId} closable={item.closable}><Comp height={this.props.winHeight - 222}/></TabPane>
				     				})
				     			}
							  </Tabs>
			        </Content>
		      </Layout>
		      <Footer className={styles.foot}>开发者:曾孝 @2017.09.18</Footer>
		    </Layout>
	  );
	}
}

export default connect((state)=>({
	...state.top
}))(MainPage);
