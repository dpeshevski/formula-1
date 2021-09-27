import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { makeSeasonList, makeSeasonResult } from '@/main/factories/pages';

const Router: React.FC = () => {  
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/seasons" />
          <Route exact path='/seasons' component={makeSeasonList} />
          <Route path='/seasons/:year' component={makeSeasonResult} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router;