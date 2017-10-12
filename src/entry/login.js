import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import LoginPage from '../routes/LoginPage';
import 'antd/dist/antd.less'
import '../index.css';
// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, 3);
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/login'));

// 4. Router
app.router(()=>(<LoginPage/>));

// 5. Start
app.start("#root");
