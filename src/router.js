import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import KeyBoard from './routes/KeyBoard';
import Pay from './routes/Pay/Pay';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={KeyBoard} />
        <Route path="/pay" exact component={Pay} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
