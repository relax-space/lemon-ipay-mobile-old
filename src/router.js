import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Pay from './routes/Pay/Pay';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/pay" exact component={Pay} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
