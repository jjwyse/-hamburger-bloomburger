import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Login from 'pages/Login/Login';

import Blogs from 'pages/Blogs/Blogs';

import Profile from 'pages/Settings/Profile';

import Layout from 'components/PageTemplates/Layout';
import LoggedInTemplate from 'components/PageTemplates/LoggedInTemplate';
import NotFound from 'pages/NotFound';

export default (
  <Route path="/" component={Layout}>
    <Route path="/login" component={Login} />

    // All routes below require authentication
    <Route component={LoggedInTemplate}>
      <IndexRoute component={Blogs} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/profile" component={Profile} />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);
