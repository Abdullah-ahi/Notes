import React from 'react'
import ReactDom from 'react-dom';
import { routes } from "./routes";

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { store, history } from './store'

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          {routes.map((route, idx) => <Route key={idx} {...route}/>)}
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#app')
)