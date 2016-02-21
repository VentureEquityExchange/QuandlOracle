/* eslint no-unused-vars:0 */
import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import PostContainer from './container/PostContainer/PostContainer';
import PostDetailView from './container/PostDetailView/PostDetailView';
import Instructions from './container/Instructions/Instructions';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Instructions} />
    <Route path="/post/:slug" component={PostDetailView}/>
  </Route>
);

export default routes;
