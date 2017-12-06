import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import KeyBoard from './routes/KeyBoard';
import CustomKeyBoard from './routes/CustomKeyBoard';
import Pay from './routes/Pay/Pay';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CustomKeyBoard} />
        <Route path="/keyBoard" exact component={KeyBoard} />
        <Route path="/pay" exact component={CustomKeyBoard} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
