import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import RegisterPage from '../routes/register/RegisterPage';
import '../index.css';
import 'antd/dist/antd.less'

// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, 3);
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/register'));

// 4. Router
app.router(()=>(<RegisterPage/>));

// 5. Start
app.start('#root');
