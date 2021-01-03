import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  About, Home, NotFound, Surah, SurahDetail,
} from './pages';

const Router = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/surah" component={Surah} />
      <Route exact path="/surah/:surahNumber([0-9]+)" component={SurahDetail} />
      <Route exact path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
