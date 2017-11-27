import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import KeyBoard from './routes/KeyBoard';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={KeyBoard} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
