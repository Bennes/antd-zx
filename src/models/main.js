import tabs from '../tabs.config';
import Global from '../utils/Global';
import { connect } from 'dva';
const SPLIT="/";
let tabIds = [];
export default {
  namespace: 'top',
	state:{
		winHeight:window.innerHeight,
		tabs:[],
		activeTab:null
	},
	subscriptions: {
    setup({ dispatch, history }) {
    	const addTab = ({Page,Model,StateToProps},tabId,tabName,params)=>{
    		const stateToProps = StateToProps||Global.noop;
    		
    		
    		const props = params.length==0?{}:(params.reduce((pre,curr,idx)=>{
    			pre['arg'+idx] = curr;
    			return pre;
    		},{}));
    		
    		dispatch({type:Model.namespace+"/clone",objId:tabId,...props});
    		    		
				let Comp = connect(StateToProps(tabId))(Page);
				
				dispatch({
					type:"addTab",
					tab:{
						name:tabName,
						comp:Comp,
						tabId:tabId,
						closable:params.length>0?(params.pop()!='false'):true
					}	
				});
    	};
    	
    	
    	function resizeListen(){
    		dispatch({type:"setState",props:{winHeight:window.innerHeight}});	
    	}
    	
    	
    	function routeListen(){
    		const route = window.location.hash.replace(/^#/g,"");
    		const path = route.split(SPLIT);
    		//path:/tabs/key/params ["","tabs","key","param1","param2"]
    		if(path.length > 3 && path[1]==="tabs"){
    			
    			const tabId = route.replace(/\//g,"_");;
    			//判断ID是否已经存在    			
    			if(tabIds.indexOf(tabId) > -1){
    				dispatch({type:"activeTab",activeTab:tabId});	
    			}else{
    				tabs[path[2]](addTab,tabId,path[3],path.splice(4));
    			}
    		}
    	}
    	
    	window.addEventListener('hashchange',routeListen,false)
    	window.addEventListener('resize',resizeListen);
    	
    	routeListen();
    	return ()=>{
    		window.removeEventListener(resizeListen);
    		window.removeEventListener(routeListen);
    	};
    }
  },
  reducers: {
  	setState(state,action){
  		return {...state,...action.props};
  	},
  	addTab(state,{tab}){
  		tabIds.push(tab.tabId);
  		return {...state,activeTab:tab.tabId,tabs:state.tabs.concat([tab])};
  	},
  	activeTab(state,{activeTab}){
  		tabIds.splice(tabIds.indexOf(activeTab),1);
  		tabIds.unshift(activeTab);
  		return {...state,activeTab};
  	},
  	removeTab(state,{tabId}){
  		tabIds.splice(tabIds.indexOf(tabId),1);
  		let activeTab = state.activeTab;
  		if(tabIds[0]!=state.activeTab){
  			activeTab = tabIds[0];
  		}
  		return {...state,activeTab,tabs:state.tabs.filter((item)=>{return tabId!=item.tabId})};
  	}
  }
};
 