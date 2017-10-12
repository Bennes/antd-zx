import React from 'react';
import { Router, Route } from 'dva/router';
import LoginPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={LoginPage} />
    </Router>
  );
}

export default RouterConfig;
