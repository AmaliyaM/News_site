import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NewsPage from './pages/NewsPage';
import UserPage from './pages/UserPage';
import history from './history';
import MenuAppBar from './components/MenuAppBar';

export default function App() {
  return (
    <Router history={history}>
      <MenuAppBar />
      <Switch>
        <Route exact path="/" component={NewsPage} />
        <Route exact path="/:user" component={UserPage} />
      </Switch>
    </Router>
  );
}
