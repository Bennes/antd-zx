import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import '../index.css';
import 'antd/dist/antd.less'
import Global from '../utils/Global';
import MainPage from '../routes/main/MainPage';


// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, 3);
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/main'));

// 4. Router
app.router(()=>(<MainPage/>));

// 5. Start
app.start('#root');

//全局定义
Global.model = app.model;
Global.unmodel = app.unmodel;
Global.app=app;