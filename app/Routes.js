import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router';
import App from './components/App';

export default () => (
  <Fragment>
    <Switch>
      <Route path='/' component={App} />
    </Switch>
  </Fragment>
);
