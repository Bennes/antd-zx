import {BaseModule} from "../../utils/Model";
import {defaultName} from '../../utils/Constant';

const validConfig = {
	
}

export default new BaseModule(validConfig,{
  namespace: "tab1",
  isSingle:false,
  state:{
  	test:1
  }
});
 