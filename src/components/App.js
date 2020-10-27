import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Badges from '../pages/Badges';
import BadgeNew from '../pages/BadgeNew';
import NotFound from '../pages/NotFound';
import ApiData from '../pages/ApiData';
import ApiSercop from '../pages/ApiSercop';
import BadgeEdit from '../pages/BageEdit';
import BadgeDetailsContainer from '../pages/BadgeDetailsContainer';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/badges" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNew} />
          <Route exact path="/api/data" component={ApiData} />
          <Route exact path="/api/sercop" component={ApiSercop} />
          <Route exact path="/badges/:badgeId" component={BadgeDetailsContainer} />
          <Route exact path="/badges/:badgeId/edit" component={BadgeEdit} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
