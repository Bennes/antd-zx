import Global from './utils/Global';
let loadingContext = {};
export default {
	tab1:function(cb,tabId,tabName,params){
			if(loadingContext.tab1!=null){
				cb(loadingContext.tab1,tabId,tabName,params)
			}else{
				require.ensure([],(require)=>{
					loadingContext.tab1 = require("./routes/main/tabs/Tab1");
					Global.model(loadingContext.tab1.Model);
					cb(loadingContext.tab1,tabId,tabName,params);
				});
			}
	}

}