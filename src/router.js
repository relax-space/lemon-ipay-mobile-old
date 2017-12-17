import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import TestKeyboardComponent from './components/Test/TestKeyboard';
import PrepayComponent from './components/Prepay/Prepay'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={PrepayComponent} />
      <Route path="/prepay" exact component={PrepayComponent} />
      <Route path="/test"  component={TestKeyboardComponent} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
