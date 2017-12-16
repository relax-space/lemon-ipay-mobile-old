import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import PrepayRouter from './routes/Prepay/Prepay';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={PrepayRouter} />
      <Route path="/pay" exact component={PrepayRouter} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
